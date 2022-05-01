import { Menu } from "@mantine/core";

const MantineMenuItem = (props) => {
    const MenuIcon = props.icon;

  return (
    <Menu.Item
        {...props}
        sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            '&:hover': {
                backgroundColor: theme.colors.gray[1],
                color:theme.colors.blue[9]
            },
            })}
        icon={<MenuIcon />}
        onClick={props.onClick}>
        {props.label}
    </Menu.Item>
  )
}

export default MantineMenuItem
