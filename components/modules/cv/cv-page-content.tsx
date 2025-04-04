"use client"

import { useEffect, useRef, useState } from "react";
import CvExperienceCard from "@/components/modules/cv/cards/cv-experience-card";
import CvEducationCard from "@/components/modules/cv/cards/cv-education-card";
import CvContextMenu from "@/components/modules/cv/cards/cv-context-menu";
import { updateCv } from "@/api/cv/serverActions";
import { EducationSchema, ExperienceSchema, userDataSchema } from "@/utils/schemas";
import CvPersonalCard from "@/components/modules/cv/cards/cv-personal-card";
import CvPersonalContextMenu from "@/components/modules/cv/cards/cv-personal-context-menu";
import AddToCv from "./add-to-cv-experience";
import AddToCvExperience from "./add-to-cv-experience";
import AddToCvEducation from "./add-to-cv-education";

const CvPageContent = ({ userData, cv, onChangeSaving, updateData }: { userData: userDataSchema; cv: any, onChangeSaving: (value: boolean) => void, updateData: (cv: any) => void }) => {

    const [cvState, setCvState] = useState<any>(cv);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if(cvState !== cv) {
            onChangeSaving(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                updCv(cvState);
            }, 3000);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [cvState]);

    const updCv = async (cv: any) => {
        try {
            await updateCv(cv);
        } catch (error) {
            console.error("Error updating CV:", error);
        } finally {
            onChangeSaving(false);
            updateData(cv)
        }
    };

    const moveItem = (section: string, fromIndex: number, toIndex: number) => {
        setCvState((prevCv: any) => {
            const updatedSection = [...prevCv[section]];
            const [movedItem] = updatedSection.splice(fromIndex, 1);
            updatedSection.splice(toIndex, 0, movedItem);

            return { ...prevCv, [section]: updatedSection };
        });

        console.log(cvState);
    };

    const deleteItem = (section: string, index: number) => {
        setCvState((prevCv: any) => {
            const updatedSection = prevCv[section].filter((_: any, i: number) => i !== index);
            return { ...prevCv, [section]: updatedSection };
        });
    };

    const toggleGradeVisibility = (index: number, value: boolean) => {
        setCvState((prevCv: any) => {
            const updatedEducation = [...prevCv.education];
            updatedEducation[index].showGrade = value;
            return { ...prevCv, education: updatedEducation };
        });
    };


    return (
        <>
            <CvPersonalContextMenu
                onToggleVisibility={(name, value) =>
                    setCvState((prevCv: any) => ({
                        ...prevCv,
                        personal: { ...prevCv.personal, [name]: value },
                    }))
                }
            >
                <CvPersonalCard
                    personalData={userData.personal}
                    cvPersonalData={cvState.personal}
                    onChange={(data) =>
                        setCvState((prevCv: any) => ({ ...prevCv, personal: data }))
                    }
                />
            </CvPersonalContextMenu>
            <div className="grid md:grid-cols-5 divide-x gap-2 mt-3">
                <div className="col-span-3">
                    <div className="flex gap-4 items-center mb-2">
                        <h2 className="font-semibold text-lg">Work Experiences</h2>
                        <AddToCvExperience experiences={userData.experiences} onAddToCv={(experience) => setCvState((prevCv: any) => ({ ...prevCv, experiences: [...prevCv.experiences, experience] }))}/>
                    </div>
                    
                    {cvState.experiences.map((item: ExperienceSchema, index: number) => (
                        <CvContextMenu
                            key={index}
                            onMoveUp={index > 0 ? () => moveItem("experiences", index, index - 1) : () => {}}
                            onMoveDown={index < cvState.experiences.length - 1 ? () => moveItem("experiences", index, index + 1) : undefined}
                            onDelete={() => deleteItem("experiences", index)} onToggleGrade={undefined}
                            >
                            <CvExperienceCard
                                experience={item}
                                onChange={(data) =>
                                    setCvState((prevCv: any) => {
                                        const updatedExperiences = [...prevCv.experiences];
                                        updatedExperiences[index] = data;
                                        return { ...prevCv, experiences: updatedExperiences };
                                    })
                                }
                            />
                        </CvContextMenu>
                    ))}
                </div>
                <div className="space-y-2 col-span-2 pl-2">
                    <div className="flex gap-4 items-center mb-2">
                        <h2 className="font-semibold text-lg">Education</h2>
                        <AddToCvEducation educations={userData.education} onAddToCv={(education) => setCvState((prevCv: any) => ({ ...prevCv, education: [...prevCv.education, education] }))}/>
                    </div>
                    {cvState.education.map((item: EducationSchema, index: number) => (
                        <CvContextMenu
                            key={index}
                            onMoveUp={index > 0 ? () => moveItem("education", index, index - 1) : () => {}}
                            onMoveDown={index < cvState.education.length - 1 ? () => moveItem("education", index, index + 1) : undefined}
                            onDelete={() => deleteItem("education", index)}
                            onToggleGrade={(value: boolean) => toggleGradeVisibility(index, value)}
                        >
                            <CvEducationCard
                                education={item}
                                onChange={(data) =>
                                    setCvState((prevCv: any) => {
                                        const updatedEducation = [...prevCv.education];
                                        updatedEducation[index] = data;
                                        return { ...prevCv, education: updatedEducation };
                                    })
                                }
                            />
                        </CvContextMenu>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CvPageContent;