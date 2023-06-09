import { Alert, Grid, Loader } from "@mantine/core";
import { BadgeCard, Cat } from "./BadgeCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Cats() {

    const queryClient = useQueryClient();
    console.log(queryClient);
    const { isLoading,error,data } = useQuery<Cat[]>({
        queryKey: ['cats'],
        queryFn: () => 
        fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/cats`) .then(
            response => response.json()
        )
        });

    if(isLoading) return (<Loader/>)
    if(error)   return (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
        Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
        </Alert>
    );
    return(<Grid m='xl'  justify="center" columns={12}>{
        data?.map(c =>
        <Grid.Col sm={6} md={4} lg={3} xl={2} >
            <BadgeCard cat={c} 
            onDelete={() => {
            }} 
            onEdit={() => {
            }}
            ></BadgeCard>
        </Grid.Col>
        )}
    </Grid>)
}