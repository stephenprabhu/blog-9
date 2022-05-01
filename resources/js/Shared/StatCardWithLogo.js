import { Card, Grid, ThemeIcon } from "@mantine/core";

const StatCardWithLogo = ({icon, color,label, val}) => {
    const CardIcon = icon;
  return (
    <Card shadow="lg" className="w-full">
        <Grid justify="center" align="center">
            <Grid.Col span={4} className="text-center">
                <ThemeIcon radius="xl" size="xl" color={color || "violet"}>
                    <CardIcon />
                 </ThemeIcon>
            </Grid.Col>
            <Grid.Col span={8}>
                <h3 className="font-bold text-md">{val || "00"}</h3>
                <span className="text-gray-700">{label}</span>
            </Grid.Col>
        </Grid>
    </Card>
  )
}

export default StatCardWithLogo
