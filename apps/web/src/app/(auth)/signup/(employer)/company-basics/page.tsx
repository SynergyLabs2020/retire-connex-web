'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

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
import { organiztaionIndustires } from '@/utils/static.data';

const companyBasicsSchema = z.object({
    organizationName: z
        .string()
        .min(1, { message: 'Organization name is required.' })
        .min(2, { message: 'Organization name must be at least 2 characters.' }),
    industry: z
        .string()
        .min(1, { message: 'Industry is required.' })
        .min(2, { message: 'Industry must be at least 2 characters.' }),
    phoneNumber: z
        .string()
        .length(12, { message: 'Please enter a complete 11-digit phone number.' })
        .startsWith('+1'),
    location: z.string().min(1, { message: 'Location is required.' }),
    organizationEmail: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please enter a valid email address.' }),
});
type ProfileFormData = z.infer<typeof companyBasicsSchema>;

export default function CompanyBasicsPage() {
    const [update, setUpdate] = useState(0);

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
            organizationName: '',
            industry: '',
            location: '',
            phoneNumber: '',
            organizationEmail: '',
        },
    });

    const onSubmit = (data: ProfileFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Company Basics"
                description="Tell us about your organization."
                step={5}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <FormInput
                        type="text"
                        label="Organization Name"
                        placeholder="Enter organization name"
                        register={register('organizationName')}
                    />

                    <ChooseEmployerIndustryDialog
                        update={update}
                        setUpdate={setUpdate}
                        title="Industry / Sector"
                        setValue={setValue}
                        data={organiztaionIndustires}
                        registeredKey={'industry'}
                    >
                        <div className="cursor-pointer" onClick={() => setUpdate((ev) => ev + 1)}>
                            <FormInput
                                readonly={true}
                                type="text"
                                value={getValues('industry')}
                                label="Industry/Sector"
                                placeholder="Select industry"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseEmployerIndustryDialog>

                    <FormInput
                        type="text"
                        label="Location"
                        placeholder="Enter your city or area"
                        register={register('location')}
                    />

                    <FormInput
                        type="email"
                        label="Organization Email"
                        placeholder="name@organization.org"
                        register={register('organizationEmail')}
                    />

                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                type="drill"
                                placeholder="Enter organization phone number"
                                label="Phone Number"
                            >
                                <IMaskInput
                                    mask="+0 (000) 000-0000"
                                    unmask={true}
                                    value={field.value}
                                    onAccept={(value) => field.onChange('+' + value)}
                                    placeholder="Enter organization phone number (U.S. only)"
                                    className={cn(
                                        'bg-accent file:text-foreground placeholder:text-muted-foreground border-input w-full min-w-0 rounded-2xl border px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none',
                                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
                                    )}
                                />
                            </FormInput>
                        )}
                    />

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
