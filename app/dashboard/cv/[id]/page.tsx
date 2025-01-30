"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCV } from "./actions";
import A4PageSkeleton from "@/components/a4page-skeleton";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import A4page from "@/components/a4page";
import CvWorkExperienceCard from "@/components/cv-work-experience-card";
import CvEducationCard from "@/components/cv-education-card";
import CvContextMenu from "@/components/cv-context-menu";
import { getCv } from "@/api/cv/serverActions";
const CVPage = () => {
    const { id } = useParams();  // Usa useParams al posto di useRouter
    const [cv, setCv] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getCV(id as string);
        }
        console.log('funziona')
    }, [id]);

    useEffect(() => {
        console.log("Updated CV:", cv);
    }, [cv]);
    const getCV = async (cvId: string) => {
        setLoading(true);
        try {
            const data = await getCv(cvId);
            setCv(data);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const moveItem = (section, fromIndex, toIndex) => {

        setCv((prevCv) => {
            const updatedSection = [...prevCv[section]];
            const [movedItem] = updatedSection.splice(fromIndex, 1);
            updatedSection.splice(toIndex, 0, movedItem);

            return { ...prevCv, [section]: updatedSection };

        });

        console.log(cv)
    };

    const deleteItem = (section, index) => {
        setCv((prevCv) => {
            const updatedSection = prevCv[section].filter((_, i) => i !== index);
            return { ...prevCv, [section]: updatedSection };
        });
    };

    const toggleGradeVisibility = (index) => {
        setCv((prevCv) => {
            const updatedEducation = [...prevCv.education];
            updatedEducation[index].showGrade = !updatedEducation[index].showGrade;
            return { ...prevCv, education: updatedEducation };
        });
    };


    if(loading) return (<A4PageSkeleton />);

    return (


    <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                CVs
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{cv.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 pt-0">
            <A4page>
                <div className="grid md:grid-cols-5 divide-x gap-2 mt-12">
                    <div className="space-y-2 col-span-3">
                        <h2 className="font-semibold text-lg">Work Experiences</h2>

                        {
                            cv.work_experiences.map((item, index) => (
                                <CvContextMenu
                                    key={index}
                                    onMoveUp={index > 0 ? () => moveItem("work_experiences", index, index - 1) : null}
                                    onMoveDown={index < cv.work_experiences.length - 1 ? () => moveItem("work_experiences", index, index + 1) : null}
                                    onDelete={() => deleteItem("work_experiences", index)}
                                >
                                    <CvWorkExperienceCard
                                        profession={item.job_title}
                                        company={item.company_name}
                                        location= 'Remoto'
                                        startDate="giu 2022"
                                        endDate="Presente"
                                        description={item.description}
                                    />
                                </CvContextMenu>
                            ))
                        }
                    </div>
                    <div className="space-y-2 col-span-2 pl-2">
                        <h2 className="font-semibold text-lg">Education</h2>
                        <CvEducationCard
                            title="Master's Degree Management Engineering"
                            institution='Politecnico di Milano'
                            location= 'Milano'
                            startDate="giu 2022"
                            endDate="Presente"
                            description=""
                            grade="110/110"
                        />
                        <CvEducationCard
                            title="Student XX Cycle"
                            institution='Alta Scuola Politecnica'
                            location= 'Milano'
                            startDate="giu 2022"
                            endDate="Presente"
                            description="The honours program at PoliMi selects only 90
                                        talented students annually. It fosters
                                        collaboration among students from Engineering,
                                        Architecture, and Design at both PoliMi and
                                        PoliTo, working together in multidisciplinary
                                        teams on various projects."
                        />
                    </div>
                </div>

            </A4page>

        </div>
    </SidebarInset>
    );
};

export default CVPage;
