'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import { cn } from '@workspace/ui/lib/utils';
import { z } from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ChooseEmployerIndustryDialog from '@/components/dialogs/ChooseEmployerIndustryDialog';
import ArrowDown from '@/components/icons/ArrowDown';
import ArrowLeft from '@/components/icons/ArrowLeft';
import Building from '@/components/icons/Building';
import { handleSingleImageUpload } from '@/utils/firbase.upload';
import { organiztaionManagerPositions } from '@/utils/static.data';

const companyBasicsSchema = z.object({
    photoUrl: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
    organizationDescription: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' }),
});

type ProfileFormData = z.infer<typeof companyBasicsSchema>;

export default function AddAccountPage() {
    const [update, setUpdate] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isValid },
        setValue,
        getValues,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(companyBasicsSchema),
        mode: 'onChange',
        defaultValues: {
            photoUrl: '',
            organizationDescription: '',
        },
    });

    const onSubmit = (data: ProfileFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Branding your profile"
                description="Add your logo and description so candidates can easily recognize your organization."
                step={7}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <div className="gap-4 mt-2">
                        <label className="flex mb-4 flex-col items-center gap-4 text-destructive text-lg font-medium cursor-pointer">
                            {getValues('photoUrl') ? (
                                <Image
                                    src={getValues('photoUrl')}
                                    width="300"
                                    height="200"
                                    alt="Certification"
                                    className="w-25 h-25 object-cover rounded-full border-dashed border-1 border-destructive"
                                />
                            ) : (
                                <div className="rounded-full hover:opacity-80 transition-all rouded-full flex items-center justify-center bg-accent border-dashed border-2 border-destructive h-25 w-25">
                                    <Building className="text-destructive w-10 h-10" />
                                </div>
                            )}
                            {isUploading ? (
                                <>Uploading...</>
                            ) : getValues('photoUrl') ? (
                                <>Change logo</>
                            ) : (
                                <>Upload logo</>
                            )}

                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={(event) =>
                                    handleSingleImageUpload(event, setIsUploading, setValue)
                                }
                                disabled={isUploading}
                            />
                        </label>
                    </div>

                    <FormInput
                        type="textarea"
                        label="Company Description"
                        placeholder="Briefly describe your mission and programs"
                        register={register('organizationDescription')}
                    />

                    <div className="flex flex-col gap-10 items-center mt-3">
                        <Button
                            size="lg"
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="cursor-pointer w-full text-white font-semibold"
                        >
                            {isSubmitting ? 'Finishing...' : 'Finish Setup'}
                        </Button>
                        <Link
                            href={'/signup/account-type'}
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
