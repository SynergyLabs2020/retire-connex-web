'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import { Slider } from '@workspace/ui/components/slider';
import z from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ChooseConsumerRoleDialog from '@/components/dialogs/ChooseConsumerRoleDialog';
import ArrowDown from '@/components/icons/ArrowDown';
import ArrowLeft from '@/components/icons/ArrowLeft';

const availabilitySchema = z
    .object({
        workRadius: z.coerce.number().min(1),
        isPaid: z.boolean(),
        isVolunteer: z.boolean(),
        workPeriod: z.enum(['weekly', 'monthly']),
        workHours: z.coerce.number().min(1),
    })
    .refine((data) => data.isVolunteer || data.isPaid, {
        message: 'You must select at least one notification method.',
    });

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

export default function AvailabilityPage() {
    const [update, setUpdate] = useState(0);

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isValid, errors },
        getValues,
        setValue,
    } = useForm<AvailabilityFormData>({
        resolver: zodResolver(availabilitySchema),
        mode: 'onChange',
        defaultValues: {
            workHours: undefined,
            workPeriod: undefined,
            isPaid: false,
            isVolunteer: false,
            workRadius: 0,
        },
    });

    const onSubmit = (data: AvailabilityFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Your time, your way"
                description="Let us know your availability, preferred roles, and travel distance."
                step={2}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <div className="grid grid-cols-2 items-end gap-2 sm:gap-5">
                        <FormInput
                            type="number"
                            label="Availability"
                            placeholder="Enter hours"
                            register={register('workHours')}
                        />
                        <div className="grid grid-cols-2 gap-0">
                            <Button
                                variant="outline"
                                size="xl-sm"
                                type="button"
                                className={
                                    '!bg-white rounded-md rounded-br-none rounded-tr-none ' +
                                    (getValues('workPeriod') === 'weekly' ? '!bg-input/90' : '')
                                }
                                onClick={() =>
                                    setValue('workPeriod', 'weekly', { shouldValidate: true })
                                }
                            >
                                Weekly
                            </Button>
                            <Button
                                variant="outline"
                                size="xl-sm"
                                type="button"
                                className={
                                    '!bg-white rounded-md rounded-bl-none rounded-tl-none ' +
                                    (getValues('workPeriod') === 'monthly' ? '!bg-input/90' : '')
                                }
                                onClick={() =>
                                    setValue('workPeriod', 'monthly', { shouldValidate: true })
                                }
                            >
                                Monthly
                            </Button>
                        </div>
                    </div>

                    <ChooseConsumerRoleDialog
                        title="Preferred Role"
                        update={update}
                        setValue={setValue}
                        getValues={getValues}
                        setUpdate={setUpdate}
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setUpdate((ev) => ev + 1);
                                console.log(errors);
                            }}
                        >
                            <FormInput
                                readonly={true}
                                type="text"
                                value={
                                    (getValues('isPaid') ? 'Paid' : '') +
                                    (getValues('isVolunteer') && getValues('isPaid') ? ', ' : '') +
                                    (getValues('isVolunteer') ? `Volunteer` : '')
                                }
                                label="Availability"
                                placeholder="Enter hours"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseConsumerRoleDialog>

                    <Controller
                        name="workRadius"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                readonly={true}
                                type="drill"
                                label="Preferred Work Radius (optional)"
                                placeholder="Enter hours"
                            >
                                <Slider
                                    val={getValues('workRadius')}
                                    onValueChange={(v: number[]) => field.onChange(v[0])}
                                    className="mt-4"
                                    color="destructive"
                                    defaultValue={[getValues('workRadius')]}
                                    max={70}
                                    step={1}
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
