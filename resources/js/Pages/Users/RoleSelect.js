import { forwardRef } from 'react';
import { Select, Group, Avatar, Text } from "@mantine/core";

const roleOptions = [{
    value:"0",
    label:"Reader",
    image:'/images/reader.png',
    description:"Has No Access To The Dashboard"
},
{
    value:"1",
    label:"Author",
    image:'/images/author.png',
    description:"Has Access To Add/Remove Posts and Comments"
},
{
    value:"2",
    label:"Admin",
    image:'/images/admin.png',
    description:"Has Unrestrcited Access To The Dashboard"
}];

const SelectItem = forwardRef(
    ({ image, label, description, ...others}, ref) => (
      <div ref={ref} {...others}>
           <Group noWrap>
                <Avatar src={image} />
                <div>
                    <Text>{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
      </div>
    )
);

const RoleSelect = ({value, onChange, error}) => {
  return (
    <Select
        required
        className="w-full pb-2 pr-6 lg:w-1/2"
        label="Role"
        placeholder="Pick one"
        itemComponent={SelectItem}
        data={roleOptions}
        value={value}
        error={error || false}
        onChange={onChange}
    />
  )
}

export default RoleSelect
