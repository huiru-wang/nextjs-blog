import ProjectModal from "@/components/projects/ProjectModal";
import { projects } from "@/lib/projects";
import { press_start_2p } from "@/lib/fonts";
export default function Home() {

    return (
        <>
            <h1 className={`${press_start_2p.className} text-3xl font-bold my-8`}>
                Dev Projects
            </h1>
            <div className="grid grid-cols-1 gap-16 xl:grid-cols-2 xl:gap-32">
                {
                    projects.map(project => {
                        return (
                            <ProjectModal
                                key={project.title}
                                redirect={project.redirect}
                                img={project.img}
                                title={project.title}
                                description={project.description}
                            />
                        )
                    })
                }
            </div>
        </>

    );
}
