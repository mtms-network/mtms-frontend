import React, {useEffect, useState} from "react";
import {GroupLayout, GroupTitle} from "../../../../../components";
import {IoTv} from "react-icons/io5";
import {Avatar} from "antd";
import {generateRandomColor} from "../../../../../helpers";

const Attendees = ({t, meeting}) => {
    const [maxInvites, setMaxInvites] = useState(window.innerWidth > 400 ? 10 : 6);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setMaxInvites(window.innerWidth > 400 ? 10 : 6)
        });

    }, [])

    return (
        <div>
            <GroupTitle className="!pb-0" icon={<IoTv />} title={"Speaker"} />
            <GroupLayout className="flex flex-wrap gap-[12px] !px-0 !pt-2 !pb-6">
                {
                    <Avatar.Group
                        maxCount={maxInvites}
                        maxPopoverTrigger="click"
                        size="large"
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                    >
                        {
                            meeting?.invitees?.map((invite, index) => {
                                return (
                                    <Avatar key={index} style={{ backgroundColor: `${generateRandomColor(invite?.contact?.email)}` }}>{ invite?.contact?.email?.charAt(0)?.toUpperCase() }</Avatar>
                                )
                            })
                        }
                    </Avatar.Group>
                }
            </GroupLayout>
        </div>
    )
}

export default Attendees;
