---
title: Solidity FundMe Smart Contract
category: web3
tags: [ethereum, solidity]
publishedAt: 2023-01-03
description: achieve solidity FundMe smart contract demo
---

众筹合约目标：
1. 实现创建收款的函数：由外部账户调用，存入一定数量的金额；
2. 实现查询金额函数：记录投资人并且查看投资人的投资金额；
3. 使用`Oracle Aggregator`获取链下数据，限制投资的最小USD金额；
4. 实现提款函数：合约的拥有者可以将合约内的资产提取到指定账户；
5. 实现在锁定期内，达到目标值，生产商可以提款；
6. 实现在锁定期内，未达到目标值，投资人可以退款；

# 1. 收款和查询

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {
	// public可以直接查询
    mapping(address => uint256) public funderToAmountMapping;

    uint256 constant MINIMUM_VALUE = 1 * 10 ** 18; // wei

    function fund() external payable {
        require(msg.value >= MINIMUM_VALUE, "Send more ETH");
        funderToAmountMapping[msg.sender] = msg.value;
    }
}
```


# 2. 获取链下数据

1. 引入Oracle预言机接口合约；
2. 找到对应网络的预言机合约地址：[Chainlink- Price Feed Contract Addresses](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1#sepolia-testnet)
3. 通过构造函数，合约部署时，将预言机喂价合约地址写入；
4. 注意：兑换比例和精度(precision)；
每一个代币都有精度的机制，以太坊中是没有小数的概念的，要表示一个完整的代币，实际上存储的值是：`1 * precision`，如果精度是18位小数，就对应：`1 * 10 ** 18`
这里的聚合函数查询到的USD的精度为8位，即`1 USD`就需要用`1 * 10 ** 8`来表示；

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {

    mapping(address => uint256) public funderToAmountMapping;

    uint256 constant MINIMUM_WEI = 1 * 10 ** 18; // 1 Wei

    uint256 constant MINIMUM_USD = 100 * 10 ** 18; // 100 USD

    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia Testnet
     * Aggregator: ETH/USD
     * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function fund() external payable {
        require(msg.value >= MINIMUM_USD, "Send more ETH");
        require(convertEthToUSD(msg.value) >= MINIMUM_USD, "Send more USD");
        funderToAmountMapping[msg.sender] = msg.value;
    }
    
    function convertEthToUSD(uint256 ethAmount) internal view returns(uint256) {
        uint256 price = uint(getChainlinkDataFeedLatestAnswer());
        // 精度，具体看预言机函数的介绍
        return ethAmount * price / (10 ** 8);
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
```


# 3. 部署到测试网络

要获取预言机的数据，必须部署到测试网络；

1. 选择环境为：Injected Provider Metamask；(也可以选择WalletConnect链接钱包的Sepolia测试网络)
2. 弹出Metamask插件，选择对应的账户和测试网络（已有Sepolia的测试Eth）
3. 执行部署；

![](../images/web3-solidity-injected-provider.png)
![](../images/web3-solidity-deploy-testnet.png)

# 4. 函数调用

选择30Finney执行Fund函数，提示交易会失败，说明此时 30 Finney 小于100USD；
![](../images/web3-solidity-fundme-fail.png)

选择40 Finney 执行Fund函数，弹出钱包确认交易；
![](../images/web3-solidity-fundme-success.png)

执行成功后，显示合约账户的余额：
![](../images/web3-solidity-fundme-success-balance.png)


# 5. 提款函数

转账函数：
`transfer`：transfer ETH and revert if tx failed; 当转账失败不会损失转账金额，仅损失gas
```js
payable(msg.sender).transfer(value)
```

向合约内添加：
1. 合约的owner；（合约创建是指定为创建者）；
2. 转换函数：将owner移交给其他地址（只允许当前owner调用）；
3. 转账函数：将当前合约的资产转移给owner；（只有资产达到TARGET才可提款）

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {

    mapping(address => uint256) public funderToAmountMapping;

    uint256 constant MINIMUM_WEI = 1 * 10 ** 18; // 1 Wei

    uint256 constant MINIMUM_USD = 100 * 10 ** 18; // 100 USD

    uint256 constant TARGET = 1000 * 10 ** 18;  // 1000 USD

    AggregatorV3Interface internal dataFeed;

// 合约的owner，在构造函数中执行一次，设定为部署合约的账户，声明为public可以直接查看此变量
    address public owner;  

    constructor() {
        owner = msg.sender;
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    function fund() external payable {
        // require(msg.value >= MINIMUM_USD, "Send more ETH");
        require(convertEthToUSD(msg.value) >= MINIMUM_USD, "Send more USD");
        funderToAmountMapping[msg.sender] = msg.value;
    }

    function getFund() external {
        // 仅允许owner提款
        require(msg.sender == owner, "This function can only be called by owner!");
        // balance 单位为：Wei
        require(convertEthToUSD(address(this).balance) >= TARGET, "Target is not reached!");
        // 提款 transfer
        payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * Eth -> USD
     */
    function convertEthToUSD(uint256 ethAmount) internal view returns(uint256) {
        uint256 price = uint(getChainlinkDataFeedLatestAnswer());
        // 精度，具体看预言机函数的介绍
        return ethAmount * price / (10 ** 8);
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "This function can only be called by owner!");
        owner = newOwner;
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
```

部署测试，执行fund、getFund
![](../images/web3-solidity-fundme-getfund.png)

其他提款函数：
send
```js
    function getFund() external {
        // 仅允许owner提款
        require(msg.sender == owner, "This function can only be called by owner!");
        // balance 单位为：Wei
        require(convertEthToUSD(address(this).balance) >= TARGET, "Target is not reached!");
        
        // 使用send，需要手动revert
        bool result = payable(msg.sender).send(address(this).balance);
        require(result, "send fail");
    }
```

call
```js
    function getFund() external {
        // 仅允许owner提款
        require(msg.sender == owner, "This function can only be called by owner!");
        // balance 单位为：Wei
        require(convertEthToUSD(address(this).balance) >= TARGET, "Target is not reached!");

        // 使用call指定gasLimit，转账失败则revert
        uint256 gasLimit = 3000;
        (bool result,) = payable(msg.sender).call{value: address(this).balance, gas: gasLimit}("");
        if (!result) {
	        revert("Transfer Failed");
        }
    }
```
# 6. 退款函数

```js
    // 投资人退款
    function refund() external {
        // 查看当前的合约的账户的资产，没有达到目标值
        require(convertEthToUSD(address(this).balance) < TARGET, "Target overflow");
        // 查看当前退款的账户的余额是不是存在
        uint256 fundBalance = funderToAmountMapping[msg.sender];
        require(fundBalance >= 0, "no fund");
        // 执行退款
        (bool success,) = payable(msg.sender).call{value: fundBalance}("");
        require(success, "transfer failed");
    }
```

上述代码存在漏洞，取款之后，并没有清空对应账户的余额

清空余额的操作应该放在转账之前，防止重入攻击；

重入攻击：收款方是一个合约账户，当发生转账调用，此合约账户可以执行一个`fallback`函数，对`refund`进行重入，重入时此账户的余额仍然是原余额，可以触发再次转账。（The Dao）

```js
    // 投资人退款
    function refund() external {
        // 查看当前的合约的账户的资产，没有达到目标值
        require(convertEthToUSD(address(this).balance) < TARGET, "Target overflow");
        // 查看当前退款的账户的余额是不是存在
        uint256 fundBalance = funderToAmountMapping[msg.sender];
        require(fundBalance >= 0, "no fund");
        // 防止重入
        funderToAmountMapping[msg.sender] = 0;
        // 执行退款
        (bool success,) = payable(msg.sender).call{value: fundBalance}("");
        require(success, "transfer failed");
    }
```


# 7. 锁定期

1. 设定合约部署的时间点；（众筹开始的时间点）
2. 锁定期时长；

增加变量、修改`fund`、`reFund`、`getFund`函数：
- 增加：startTimestamp（开始时间）
- 增加：lockTime（锁定时长）
- 修改：`fund`函数只能在锁定期内投资；
- 修改：`reFund`、`getFund`函数只能在锁定期过后提款、退款；

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {

	// ....
	// 开始时间
    uint256 startTimestamp;
    // 精度为妙，如 10 min = 60 * 10
    uint256 lockTime;

    constructor(uint256 _lockTime) {

		// ...
		
        startTimestamp = block.timestamp; // 当前所部署时的区块的时间戳
        lockTime = _lockTime;
    }

    function fund() external payable {
        // require(msg.value >= MINIMUM_USD, "Send more ETH");
        require(convertEthToUSD(msg.value) >= MINIMUM_USD, "Send more USD");
        // 校验是否超出锁定期，此时的block是当前执行此函数时所在的区块（非部署时的block）
        require(block.timestamp < startTimestamp + lockTime, "lock winodw is closed");
        funderToAmountMapping[msg.sender] = msg.value;
    }

    // 投资人退款
    function refund() external lockWindowCheck {
        // 查看当前的合约的账户的资产，没有达到目标值
        require(convertEthToUSD(address(this).balance) < TARGET, "Target overflow");
        // 查看当前退款的账户的余额是不是存在
        uint256 fundBalance = funderToAmountMapping[msg.sender];
        require(fundBalance >= 0, "no fund");
        // 防止重入
        funderToAmountMapping[msg.sender] = 0;
        // 执行退款
        (bool success,) = payable(msg.sender).call{value: fundBalance}("");
        require(success, "transfer failed");
    }

    function getFund() external lockWindowCheck {
        // 仅允许owner提款
        require(msg.sender == owner, "This function can only be called by owner!");
        // balance 单位为：Wei
        require(convertEthToUSD(address(this).balance) >= TARGET, "Target is not reached!");
        // 转账 transfer：将address的余额，转账给msg.sender
        payable(msg.sender).transfer(address(this).balance);
    }

	// 使用modifier增加复用、可读性
    modifier lockWindowCheck() {
        require(block.timestamp >= startTimestamp + lockTime, "lock winodw is not closed");
        _;
    }

	// ....
```