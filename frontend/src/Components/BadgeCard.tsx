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
import { IconHeart, IconCoin } from '@tabler/icons-react';

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
    name: string,
    age: number,
    color: string,
    sex: string,
    image: string | undefined,
    breed: string | undefined,
    sterilized: boolean,
}

export function BadgeCard({ name, age, color, image, breed, }: BadgeCardProps) {
    const { classes, } = useStyles();


    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={image} alt={name} height={230} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="left">
                    <Text fz="lg" fw={500}>
                        {name} {age} Лет
                    </Text>
                </Group>
                <Group position="left" mt='xs'>
                    <Badge size="sm">{breed}</Badge>
                    <Badge size="sm">{color}</Badge>
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text fz="sm" mt="xs">
                    Описание забыли сделать
                </Text>

                <Group mt="xs">
                    <div style={{ flex: 1 }}>

                    </div>
                    <ActionIcon variant="default" radius="md" size={36}>
                        <IconCoin size="1.5rem" className={classes.coin} stroke={1.8} />
                    </ActionIcon>

                    <ActionIcon variant="default" radius="md" size={36}>
                        <IconHeart size="1.4rem" className={classes.like} stroke={1.8} />
                    </ActionIcon>
                </Group>
            </Card.Section>
        </Card>
    );
}