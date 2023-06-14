import { Alert, Grid, Loader, Modal, useMantineTheme } from "@mantine/core";
import { BadgeCard } from "./BadgeCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconAlertCircle } from "@tabler/icons-react";
import { catsDelete, catsGet } from "../endpoints";
import { Cat } from "../types/cat.interface";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import EditModal from "./EditForm";
import { useState } from "react";
import { EmptyBadgeCard } from "./EmptyBadgeCard";

export default function Cats() {

    const queryClient = useQueryClient();
    const theme = useMantineTheme();

    const { isLoading, error, data } = useQuery<Cat[]>(['cats'], catsGet);
    const [opened, { open, close }] = useDisclosure(false);
    const [selected, setSelected] = useState<Cat>(undefined!);
    const mobile = useMediaQuery('(max-width: 40em)');

    const deleteCat = useMutation<Cat, unknown, number>(['deleteCat',], catsDelete,
        {
            onSuccess: () => queryClient.invalidateQueries(['cats'])
        }
    )

    if (isLoading) return <Loader />;
    if (error) return (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </Alert>
    );
    return (
        <>
            <Modal opened={opened} onClose={close} title="Редактирование" size='auto' centered fullScreen={mobile} m={0} 
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}>
                <EditModal cat={selected} onSave={close} />
            </Modal>
            <Grid m='xl' justify="center" columns={12}>{
                data?.map(c =>
                    <Grid.Col sm={6} md={4} lg={3} xl={2} key={c.id}>
                        <BadgeCard key={c.id} cat={c}
                            onDelete={() => {
                                deleteCat.mutate(c.id)
                            }}
                            onEdit={() => {
                                setSelected(c);
                                open();
                            }}
                        ></BadgeCard>
                    </Grid.Col>
                )}
                <Grid.Col sm={6} md={4} lg={3} xl={2} key={'new'}>
                    <EmptyBadgeCard />
                </Grid.Col>
            </Grid>
        </>)
}