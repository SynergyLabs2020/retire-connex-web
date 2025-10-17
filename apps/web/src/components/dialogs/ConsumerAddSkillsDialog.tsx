import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workspace/ui/components/dialog';
import { FormInput } from '@workspace/ui/components/form.input';
import z from 'zod';

interface DialogProps {
    children: React.ReactNode;
    title: string;
    addValue: (val: any) => void;
}

const skillSchema = z.object({
    skill: z.string().min(2, { message: 'Skill must be at least 2 characters.' }),
});

type SkillFormData = z.infer<typeof skillSchema>;

export default function ConsumerAddSkillsDialog({ children, title, addValue }: DialogProps) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
        setValue,
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillSchema),
        mode: 'onChange',
        defaultValues: {
            skill: undefined,
        },
    });

    const onSubmit = (data: SkillFormData) => {
        addValue(data.skill);
        setValue('skill', '');
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:w-[350px] max-w-[400px] max-h-2/3">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            type="text"
                            label=""
                            placeholder="Add new one"
                            register={register('skill')}
                        ></FormInput>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setValue('skill', '')}
                                    variant={'ghost'}
                                    type="button"
                                    size="lg"
                                    className="bg-accent rounded-xl"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="cursor-pointer rounded-xl w-full text-white font-semibold"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
