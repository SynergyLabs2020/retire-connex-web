'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import { Switch } from '@workspace/ui/components/switch';
import z from 'zod';

import AuthHeader from '@/components/AuthHeader';
import ChooseConsumerDetailsDialog from '@/components/dialogs/ChooseConsumerDetailsDialog';
import ArrowDown from '@/components/icons/ArrowDown';
import ArrowLeft from '@/components/icons/ArrowLeft';
import Profile from '@/components/icons/Profile';
import { handleSingleImageUpload } from '@/utils/firbase.upload';
import { notificationTypes, notifyAbout } from '@/utils/static.data';

const settingsSchema = z.object({
    photoUrl: z.string().url({ message: 'Please enter a valid URL.' }),
    notificationTypes: z
        .array(z.string())
        .min(1, { message: 'Please select at least one notification type.' }),
    notifyAbout: z
        .array(z.string())
        .min(1, { message: 'Please select at least one option to be notified about.' }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [update, setUpdate] = useState(0);

    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
        getValues,
        setValue,
    } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        mode: 'onChange',
        defaultValues: {
            photoUrl: undefined,
            notificationTypes: [],
            notifyAbout: [],
        },
    });

    const onSubmit = (data: SettingsFormData) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const setNotificationTypes = (isChecked: boolean, typeValue: string) => {
        const currentTypes = getValues('notificationTypes') || [];

        if (isChecked) {
            const newTypes = [...currentTypes, typeValue];
            setValue('notificationTypes', newTypes, { shouldValidate: true });
        } else {
            const newTypes = currentTypes.filter((type) => type !== typeValue);
            setValue('notificationTypes', newTypes, { shouldValidate: true });
        }
    };

    const format = (items: string[]): string => {
        return items.join(', ');
    };

    return (
        <div className="flex flex-col items-center">
            <AuthHeader
                heading="Make your profile truly yours! "
                description="Add a photo for recognition and select notifications to stay updated."
                step={4}
            />

            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <div className="gap-4 mt-2">
                        <label className="flex items-center gap-6 text-destructive text-lg font-medium cursor-pointer">
                            {isUploading ? (
                                <div className="w-25 h-25 flex items-center justify-center bg-accent rounded-full">
                                    <p>Uploading...</p>
                                </div>
                            ) : (
                                <>
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
                                            <Profile className="text-destructive w-10 h-10" />
                                        </div>
                                    )}
                                    {getValues('photoUrl') ? (
                                        <>Change photo</>
                                    ) : (
                                        <>Upload profile photo</>
                                    )}
                                </>
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

                    <div className="flex flex-col gap-5">
                        {notificationTypes.map((item) => (
                            <div
                                key={item.value}
                                className="flex justify-between items-center w-full bg-accent p-5 rounded-3xl"
                            >
                                <p className="text-lg">{item.label}</p>
                                <Switch
                                    checked={getValues('notificationTypes')?.includes(item.value)}
                                    onCheckedChange={(value) =>
                                        setNotificationTypes(value, item.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <ChooseConsumerDetailsDialog
                        title="Notification Types"
                        update={update}
                        data={notifyAbout}
                        objectKey="notifyAbout"
                        setValue={setValue}
                        getValues={getValues}
                        setUpdate={setUpdate}
                    >
                        <div className="cursor-pointer" onClick={() => setUpdate((ev) => ev + 1)}>
                            <FormInput
                                readonly={true}
                                type="text"
                                value={format(getValues('notifyAbout'))}
                                label="Notification Types"
                                placeholder="Select from list or add your own"
                            >
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowDown className="w-4 h-4" />
                                </div>
                            </FormInput>
                        </div>
                    </ChooseConsumerDetailsDialog>

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
