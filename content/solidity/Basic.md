---
title: Solidity Basic
category: web3
tags: [ethereum, solidity]
publishedAt: 2023-01-01
description: solidity key words and data types
---

# constant

constant：常量，在任何地方都不可被修改；
```js
uint256 constant TARGET = 1000;
```

# public & private & internal & external

| Visibility | Within Contract | Outside Contracts | Child Contracts | External Contracts |
| ---------- | --------------- | ----------------- | --------------- | ------------------ |
| public     | Yes             | Yes               | Yes             | Yes                |
| private    | Yes             | No                | No              | No                 |
| internal   | Yes             | No                | Yes             | No                 |
| external   | No              | Yes               | No              | Yes                |

# memory & calldata & storage

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract HelloWorld {

    string message = "hello world";

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string calldata text) public {
	    // calldata：保证text不可被修改
        message = text;
    }
    
    function setMoreMessage(string memory text) public {
	    // memory：允许text被修改
        text = string.concat(text, " From External");
        message = text;
    }
}
```

memory & calldata & storage：显式告知编译器所修饰的对象存储在哪、是否可变；
- `memory` ：内存存储、可变；
- `calldata`：内存存储、不可变；
- `storage`：持久化存储

# view & pure





# payable

表示此函数可以接受网络的native token




## struct
```js
struct Info {
	uint256 id;
	string message;
	address addr;
}
```
## array
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract HelloWorld {
	// 声明结构体
    struct Info {
        uint256 id;
        string message;
        address addr;
    }
	// 声明结构体数组
    Info[] infos;

    function pushInfo(uint256 _id, string memory _message) public {
        Info memory info = Info(_id, _message, msg.sender);
        infos.push(info);
    }

    function getInfoById(uint256 _id) public view returns (Info memory) {
        for (uint256 i = 0; i < infos.length; i++) {
            if (infos[i].id == _id) {
                return infos[i];
            }
        }
        return Info(_id, "", msg.sender);
    }
}
```

## mapping
```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract HelloWorld {
	// 声明结构体
    struct Info {
        uint256 id;
        string message;
        address addr;
    }
	// 声明结构体map
    mapping(uint256 => Info) public infoMapping;

    function pushInfo(uint256 _id, string memory _message) public {
        Info memory info = Info(_id, _message, msg.sender);
        infoMapping[_id] = info;
    }

    function getInfoById(uint256 _id) public view returns (Info memory) {
        Info memory info = infoMapping[_id];
        // 是否存在
        if (info.addr == address(0x0)) {
            return Info(_id, "", msg.sender);
        }
        return info;
    }
}
```


# Enviroment Variable
msg

block



# constructor

```js
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }
```


# Timestamp

Solidity中使用的时间是Unix Timestamp，精度为妙；




# modifier

`modifier`（修饰符）是一种特殊的函数属性，用于在函数执行前后添加额外的逻辑或条件检查。

## 定义`modifier`

```js
modifier lockWindowCheck {
	require(block.timestamp >= startTimestamp + lockTime, "lock winodw is closed");
	_;
}
```


## 使用`modifier`

