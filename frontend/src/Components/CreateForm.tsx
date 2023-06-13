import { Cat, UpdateCat } from "../types/cat.interface";
import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, SegmentedControl, Switch, TextInput, Textarea, useMantineTheme } from "@mantine/core";
import { IconMars, IconVenus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catsCreate} from "../endpoints";

interface CreateModalProps {
    onSave:() => void;
}

export default function CreateModal({ onSave }: CreateModalProps) {

    const theme = useMantineTheme();
    const queryClient = useQueryClient();
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            age: 0,
            color: "",
            breed: "",
            sterilized: false,
            sex: "",
            image: "",
        }
    });

    const updateCat = useMutation<Cat, unknown, UpdateCat>(['createCat',], catsCreate,
        {
            onSuccess: () => queryClient.invalidateQueries(['cats'])
        }
    )

    return (
        <form>
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
                {...form.getInputProps('sterilized')} />
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
                <Button color='teal' onClick={() => { updateCat.mutate(form.values);onSave();}}>Сохранить</Button>
            </Group>
        </form>
    )

}