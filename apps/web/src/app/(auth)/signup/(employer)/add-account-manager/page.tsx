'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import { z } from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ChooseEmployerIndustryDialog from '@/components/dialogs/ChooseEmployerIndustryDialog';
import ArrowDown from '@/components/icons/ArrowDown';
import ArrowLeft from '@/components/icons/ArrowLeft';
import { organiztaionManagerPositions } from '@/utils/static.data';

const addOrganizationManagerSchema = z.object({
    organizationManagerName: z
        .string()
        .min(1, { message: "Manager's name is required." })
        .min(2, { message: 'Name must be at least 2 characters.' }),
    organizationManagerEmail: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please enter a valid email address.' }),
    organizationManagerPosition: z
        .string()
        .min(1, { message: "Manager's position is required." })
        .min(2, { message: 'Position must be at least 2 characters.' }),
});

type AddOrganizationManagerFormData = z.infer<typeof addOrganizationManagerSchema>;

export default function AddAccountPage() {
    const [update, setUpdate] = useState(0);

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isValid },
        setValue,
        getValues,
    } = useForm<AddOrganizationManagerFormData>({
        resolver: zodResolver(addOrganizationManagerSchema),
        mode: 'onChange',
        defaultValues: {
            organizationManagerName: '',
            organizationManagerEmail: '',
            organizationManagerPosition: '',
        },
    });

    const onSubmit = (data: AddOrganizationManagerFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Account Manager"
                description="This person will manage your account and communicate with candidates."
                step={6}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <FormInput
                        type="text"
                        label="Full Name"
                        placeholder="Enter full name"
                        register={register('organizationManagerName')}
                    />

                    <FormInput
                        type="email"
                        label="Work Email"
                        placeholder="name@organization.org"
                        register={register('organizationManagerEmail')}
                    />

                    <ChooseEmployerIndustryDialog
                        update={update}
                        setUpdate={setUpdate}
                        title="Position"
                        setValue={setValue}
                        data={organiztaionManagerPositions}
                        registeredKey={'organizationManagerPosition'}
                    >
                        <div className="cursor-pointer" onClick={() => setUpdate((ev) => ev + 1)}>
                            <FormInput
                                readonly={true}
                                type="text"
                                value={getValues('organizationManagerPosition')}
                                label="Position"
                                placeholder="e.g., Volunteer Coordinator"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseEmployerIndustryDialog>

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
