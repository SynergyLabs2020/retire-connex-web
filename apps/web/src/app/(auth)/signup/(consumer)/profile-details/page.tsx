'use client';

import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { Calendar28 } from '@workspace/ui/components/datepicker';
import { FormInput } from '@workspace/ui/components/form.input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { cn } from '@workspace/ui/lib/utils';
import { z } from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ArrowLeft from '@/components/icons/ArrowLeft';
import Calendar from '@/components/icons/Calendar';

const profileDetailsSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
    phoneNumber: z
        .string()
        .length(12, { message: 'Please enter a complete 11-digit phone number.' })
        .startsWith('+1'),
    location: z.string().min(1, { message: 'Location is required.' }),
    birthDate: z.string().min(1, { message: 'Date of birth is required.' }),
    gender: z.enum(['Male', 'Female'], { required_error: 'Please select a gender.' }),
});

type ProfileFormData = z.infer<typeof profileDetailsSchema>;

export default function ProfileDetailsPage() {
    const options = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
    ];

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isValid, errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileDetailsSchema),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            location: '',
            birthDate: '',
            phoneNumber: '',
            gender: undefined,
        },
    });

    const onSubmit = (data: ProfileFormData, err: any) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Let’s get to know you"
                description="Start with a few simple details so we can create your profile and say hello properly."
                step={1}
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormInput
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                            register={register('firstName')}
                        />
                        <FormInput
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            register={register('lastName')}
                        />
                    </div>

                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                type="drill"
                                placeholder="Enter your phone number"
                                label="Phone Number"
                            >
                                <IMaskInput
                                    mask="+0 (000) 000-0000"
                                    unmask={true}
                                    value={field.value}
                                    onAccept={(value) => field.onChange('+' + value)}
                                    placeholder="Enter your phone number (U.S. only)"
                                    className={cn(
                                        'bg-accent file:text-foreground placeholder:text-muted-foreground border-input w-full min-w-0 rounded-2xl border px-3 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none',
                                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
                                    )}
                                />
                            </FormInput>
                        )}
                    />

                    <FormInput
                        type="text"
                        label="Location"
                        placeholder="Enter your city or area"
                        register={register('location')}
                    />

                    <Controller
                        name="birthDate"
                        control={control}
                        render={({ field }) => (
                            <Calendar28
                                label="Date of Birth"
                                v={field.value}
                                onDateChange={field.onChange}
                            >
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer absolute hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 top-1/2 right-2 size-6 -translate-y-1/2">
                                    <Calendar className="w-4 h-4" />
                                </div>
                            </Calendar28>
                        )}
                    />

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <FormInput type="drill" placeholder="Select gender" label="Gender">
                                <Select
                                    onValueChange={(value: string) => {
                                        console.log(value);
                                        field.onChange(value);
                                        console.log(errors);
                                    }}
                                >
                                    <SelectTrigger className="w-full !h-12 !rounded-xl text-md">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options?.map((item) => (
                                            <SelectItem value={item.value!} key={item.value}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
