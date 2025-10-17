'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import z from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ChooseConsumerSkillsDialog from '@/components/dialogs/ChooseConsumerSkillsDialog';
import Add from '@/components/icons/Add';
import ArrowDown from '@/components/icons/ArrowDown';
import ArrowLeft from '@/components/icons/ArrowLeft';
import { handleImageUpload } from '@/utils/firbase.upload';
import { consumerHobbiesStatic, consumerSkillsStatic } from '@/utils/static.data';

const skillsSchema = z.object({
    skills: z.array(z.string()).min(1),
    hobbies: z.array(z.string()).min(1),
    images: z.array(z.string()).min(1),
    experience: z.coerce.number().min(1).optional(),
});

type SkillsFormData = z.infer<typeof skillsSchema>;

export default function SkillsPage() {
    const [update, setUpdate] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [hobbies, setHobbies] = useState(consumerHobbiesStatic);
    const [skills, setSkills] = useState(consumerHobbiesStatic);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
        getValues,
        setValue,
    } = useForm<SkillsFormData>({
        resolver: zodResolver(skillsSchema),
        mode: 'onChange',
        defaultValues: {
            skills: [],
            hobbies: [],
            images: [],
            experience: undefined,
        },
    });

    const format = (items: string[]): string => {
        return items.join(', ');
    };

    const onSubmit = (data: SkillsFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Show us what you love"
                description="Tell us about your hobbies and skills. This helps connect you with meaningful opportunities to do what you enjoy."
                step={3}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <ChooseConsumerSkillsDialog
                        title="Hobbies & Interests"
                        update={update}
                        data={hobbies}
                        set={setHobbies}
                        objectKey="hobbies"
                        setValue={setValue}
                        getValues={getValues}
                        setUpdate={setUpdate}
                    >
                        <div className="cursor-pointer" onClick={() => setUpdate((ev) => ev + 1)}>
                            <FormInput
                                readonly={true}
                                type="text"
                                value={format(getValues('hobbies'))}
                                label="Hobbies & Interests"
                                placeholder="Select from list or add your own"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseConsumerSkillsDialog>
                    <ChooseConsumerSkillsDialog
                        title="Professional Experience & Skills"
                        update={update}
                        data={skills}
                        set={setSkills}
                        objectKey="skills"
                        setValue={setValue}
                        getValues={getValues}
                        setUpdate={setUpdate}
                    >
                        <div className="cursor-pointer" onClick={() => setUpdate((ev) => ev + 1)}>
                            <FormInput
                                readonly={true}
                                type="text"
                                value={format(getValues('skills'))}
                                label="Professional Experience & Skills"
                                placeholder="Select from list or add your own"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseConsumerSkillsDialog>
                    <FormInput
                        type="number"
                        label="Years of Professional Experience (optional)"
                        placeholder="Enter number of years"
                        register={register('experience')}
                    />

                    <FormInput type="drill" label="Certifications/Licenses">
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {getValues('images').map((url) => (
                                <Image
                                    key={url}
                                    src={url}
                                    width="300"
                                    height="200"
                                    alt="Certification"
                                    className="w-30 h-30 object-cover rounded-2xl border-dashed border-1 border-destructive"
                                />
                            ))}

                            {isUploading && (
                                <div className="w-30 h-30 flex items-center justify-center bg-accent rounded-2xl">
                                    <p>Uploading...</p>
                                </div>
                            )}

                            <label>
                                <div className="hover:opacity-80 transition-all flex items-center justify-center cursor-pointer bg-accent rounded-2xl border-dashed border-2 border-destructive h-30 w-30">
                                    <Add className="text-destructive w-10 h-10" />
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/png, image/jpeg, application/pdf"
                                    onChange={(event) =>
                                        handleImageUpload(
                                            event,
                                            setIsUploading,
                                            setValue,
                                            getValues
                                        )
                                    }
                                    disabled={isUploading || getValues('images').length >= 5}
                                />
                            </label>
                        </div>
                    </FormInput>
                    <div className="flex flex-col gap-10 items-center mt-3">
                        <Button
                            size="lg"
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="cursor-pointer w-full text-white font-semibold"
                        >
                            {isSubmitting ? 'Wait a moment...' : 'Continue'}
                        </Button>
                        <Link
                            href={'/signup/profile-details'}
                            className="font-semibold flex items-center gap-1 mb-10"
                        >
                            <ArrowLeft />
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
