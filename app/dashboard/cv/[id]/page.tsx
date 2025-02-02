"use client";

import { useEffect, useRef, useState } from "react";
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
import CvExperienceCard from "@/components/modules/cv/cards/cv-experience-card";
import CvEducationCard from "@/components/modules/cv/cards/cv-education-card";
import CvContextMenu from "@/components/modules/cv/cards/cv-context-menu";
import { getCv } from "@/api/cv/serverActions";
import { CvSidebarSheet } from "@/components/modules/cv/sidebar/sheet";
import { getUserData } from "@/api/about/serverActions";
import { EducationSchema, ExperienceSchema, userDataSchema } from "@/utils/schemas";
import AboutMeCard from "@/components/personal-card";
import PersonalCard from "@/components/personal-card";


const CVPage = () => {
    const { id } = useParams();  // Usa useParams al posto di useRouter
    const [cv, setCv] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<userDataSchema>();
    const [saving, setSaving] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Reference al timer
    

    useEffect(() => {
        if (id) {
            getCV(id as string);
        }
        console.log('funziona')
    }, [id]);

    useEffect(() => {
        console.log("Updated CV:", cv);
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            console.log('Salvataggio')
        }, 3000);

        return () => clearTimeout(timerRef.current!);
    }, [cv]);

    const getCV = async (cvId: string) => {
        setLoading(true);
        try {
            const data = await getCv(cvId);
            const userData = await getUserData();
            
            setCv(data);
            setUserData(userData);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const moveItem = (section: string, fromIndex: number, toIndex: number) => {

        setCv((prevCv: any) => {
            const updatedSection = [...prevCv[section]];
            const [movedItem] = updatedSection.splice(fromIndex, 1);
            updatedSection.splice(toIndex, 0, movedItem);

            return { ...prevCv, [section]: updatedSection };

        });

        console.log(cv)
    };

    const deleteItem = (section: string, index: number) => {
        setCv((prevCv: any) => {
            const updatedSection = prevCv[section].filter((_, i) => i !== index);
            return { ...prevCv, [section]: updatedSection };
        });
    };

    const toggleGradeVisibility = (index: number, value: boolean) => {
        console.log('prova')
        setCv((prevCv: any) => {
            const updatedEducation = [...prevCv.education];
            console.log(updatedEducation[index].showGrade)
            updatedEducation[index].showGrade = value;
            console.log(updatedEducation[index].showGrade)
            return { ...prevCv, education: updatedEducation };
        });
    };


    if(loading) return (<A4PageSkeleton />);

    return (


    <SidebarInset>
        { userData && <CvSidebarSheet open="false" userData={userData}/>}
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
                {userData && <PersonalCard personal={userData.personal} />}
                <div className="grid md:grid-cols-5 divide-x gap-2 mt-12">
                    <div className="col-span-3">
                        <h2 className="font-semibold text-lg">Work Experiences</h2>

                        {
                            cv.experiences.map((item: ExperienceSchema, index: number) => (
                                <CvContextMenu
                                    key={index}
                                    onMoveUp={index > 0 ? () => moveItem("experiences", index, index - 1) : null}
                                    onMoveDown={index < cv.experiences.length - 1 ? () => moveItem("experiences", index, index + 1) : null}
                                    onDelete={() => deleteItem("experiences", index)}
                                >
                                    <CvExperienceCard
                                        experience={item}
                                    />
                                </CvContextMenu>
                            ))
                        }
                    </div>
                    <div className="space-y-2 col-span-2 pl-2">
                        <h2 className="font-semibold text-lg">Education</h2>
                        {
                            cv.education.map((item: EducationSchema, index: number) => (
                                <CvContextMenu
                                    key={index}
                                    onMoveUp={index > 0 ? () => moveItem("education", index, index - 1) : null}
                                    onMoveDown={index < cv.experiences.length - 1 ? () => moveItem("experiences", index, index + 1) : null}
                                    onDelete={() => deleteItem("education", index)}
                                    onToggleGrade={(value: boolean) => toggleGradeVisibility(index, value)}
                                >
                                    <CvEducationCard
                                        education={item}
                                    />
                                </CvContextMenu>
                            ))
                        }
                        
                    </div>
                </div>

            </A4page>

        </div>
    </SidebarInset>
    );
};

export default CVPage;
