import React from "react";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export function ProjectGroupAvatars(props){
	return (
		<AvatarGroup max={4}>
			{
				props.team.map((item,index)=>{
					return <AvatarIcon key={index}/>
				})
			}
		</AvatarGroup>
	)
}


function AvatarIcon(props){
	return <Avatar/>
}