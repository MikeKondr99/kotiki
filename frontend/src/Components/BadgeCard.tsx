import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    ActionIcon,
    createStyles,
    rem,
} from '@mantine/core';
import { IconHeart, IconCoin,IconMars,IconVenus,IconTrash,IconEdit } from '@tabler/icons-react';
import { Cat } from '../types/cat.interface';

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

interface BadgeCardProps {
    cat: Cat,
    onDelete:(cat:Cat) => void,
    onEdit:(cat:Cat) => void,
}

export function BadgeCard({cat,onDelete,onEdit, }: BadgeCardProps) {

    const { classes, } = useStyles();
    const goodSolution = ['Лет','Год','Года','Года','Года','Лет','Лет','Лет','Лет','Лет'];

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={cat.image} alt={cat.name} height={230} withPlaceholder/>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="left">
                    {
                        cat.sex == "M" ?  <IconMars size="1.5rem" className={classes.mars} stroke={1.8} />
                        : cat.sex == "F" ?  <IconVenus size="1.5rem" className={classes.like} stroke={1.8} />
                        : <></>
                    }
                    <Text fz="lg" fw={500}>
                        {cat.name} {cat.age} { cat.age<20 && cat.age>=10 ? 'Лет' : goodSolution[cat.age%10]}
                    </Text>
                </Group>
                <Group position="left" mt='xs'>
                    { !!cat.breed ? <Badge size="sm">{cat.breed}</Badge> : <></> }
                    <Badge size="sm">{cat.color}</Badge>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text fz="sm" mt="xs">
                    { cat.description }
                </Text>

                <Group mt="xs" spacing='xs'>
                    <div style={{ flex: 1 }}>

                    </div>
                    <ActionIcon variant="default" radius="md" size={36}>
                        <IconCoin  className={classes.coin} stroke={1.8} />
                    </ActionIcon>
                    <ActionIcon variant="default" radius="md" size={36}>
                        <IconHeart  className={classes.like} stroke={1.8} />
                    </ActionIcon>
                    <ActionIcon variant="default" radius="md" size={36} onClick={() => onEdit(cat)}>
                        <IconEdit  className={classes.mars} stroke={1.8}  />
                    </ActionIcon>
                    <ActionIcon color="red" variant="filled" size={36} onClick={() => onDelete(cat)}>
                        <IconTrash  stroke={1.8} />
                    </ActionIcon>
                </Group>
            </Card.Section>
        </Card>
    );
}