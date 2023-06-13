import { Cat, UpdateCat } from "../types/cat.interface";
import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, SegmentedControl, Switch, TextInput, Textarea, useMantineTheme } from "@mantine/core";
import { IconMars, IconVenus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catsUpdate } from "../endpoints";

interface EditModalProps {
    cat: Cat,
    onSave:() => void;
}

export default function EditModal({ cat,onSave }: EditModalProps) {

    const theme = useMantineTheme();
    const queryClient = useQueryClient();
    const form = useForm({
        initialValues: {
            name: cat.name,
            description: cat.description,
            age: cat.age,
            color: cat.color,
            breed: cat.breed,
            sterilized: cat.sterilized,
            sex: cat.sex,
            image: cat.image,
        },
        validate: {
            name: (x) => x.length > 16 ? "Имя должно быть короче 17ти символов" : null,
            color: (x) => x.length == 0 ? "Цвет обязательное поле" : null,
            sex: (x) => x=="M" || x=="F" ? null : "Нужно указать пол"
        }
    });

    const updateCat = useMutation<Cat, unknown, { id: number, cat: UpdateCat }>(['updateCat',], catsUpdate,
        {
            onSuccess: () => queryClient.invalidateQueries(['cats'])
        }
    )

    return (
        <form onSubmit={form.onSubmit((values) => {
            updateCat.mutate({id:cat.id,cat:values});
            onSave();
        })}>
            <TextInput
                label="Имя"
                placeholder="Кличка питомца :3"
                {...form.getInputProps('name')} withAsterisk />
            <Textarea
                label="Описание"
                placeholder="Игривый"
                {...form.getInputProps('description')} />
            <Group position="apart" align="baseline">
                <NumberInput
                    label="Возраст"
                    placeholder="Введите возраст"
                    {...form.getInputProps('age')}
                    withAsterisk />
                <TextInput
                    label="Цвет"
                    placeholder="Не указан"
                    {...form.getInputProps('color')}
                    withAsterisk />
                <TextInput
                    label="Порода"
                    placeholder="Не указана"
                    {...form.getInputProps('breed')} />
            </Group>
            <Switch my={15}
                label="Стерилизован"
                labelPosition="left"
                {...form.getInputProps('sterilized',{type: 'checkbox'})} />
            <SegmentedControl {...form.getInputProps('sex')}
                data={[
                    {
                        value: 'M',
                        label: (
                            <IconMars color={theme.colors.blue[6]} size="1.2rem" />
                        )
                    },
                    {
                        value: 'F',
                        label: (
                            <IconVenus color={theme.colors.red[6]} size="1.2rem" />
                        )
                    },
                ]}
            />
            <TextInput label="Изображение" placeholder="http://example.com/image.jpg" {...form.getInputProps('image')} />
            <Group position="center" my={10}>
                <Button color='teal' type='submit'>Сохранить</Button>
            </Group>
        </form>
    )

}