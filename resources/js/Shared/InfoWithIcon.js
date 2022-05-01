import { ThemeIcon } from "@mantine/core";

const InfoWithIcon = ({icon, children}) => {
    const Icon = icon;
  return (
    <div className="flex bg-gray-200 rounded-sm  items-center py-2 px-2 my-2">
        <ThemeIcon>
            <Icon />
        </ThemeIcon>
        <div className="ml-3">
            {children}
        </div>
    </div>
  )
}

export default InfoWithIcon
