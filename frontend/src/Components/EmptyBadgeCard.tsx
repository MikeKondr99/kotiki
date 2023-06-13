import {
    Button,
    Card,
    CardSection,
    Center,
    Modal,
    createStyles,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { IconCat, IconPlus} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import CreateModal from './CreateForm';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    mars: {
        color: theme.colors.blue[6],
    },

    coin: {
        color: theme.colors.yellow[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));


export function EmptyBadgeCard() {

    const theme = useMantineTheme();
    const { classes, } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Создание"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }} centered>
                <CreateModal onSave={close} />
            </Modal>
            <Card withBorder radius="md" p="md" className={classes.card} h='100%'>
                <CardSection className={classes.section}>
                    <Center p='xl'>
                        <IconCat size='4rem' />
                    </Center>
                </CardSection>
                <CardSection className={classes.section}>
                    <Center p='xl'>
                        <Button color='teal' onClick={open}><IconPlus/></Button>
                    </Center>
                </CardSection>
            </Card>
        </>
    );
}