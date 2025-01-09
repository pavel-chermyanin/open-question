
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import {useSelector} from "react-redux";
import {selectUser} from "@/entities/user";


export const UserInfo = ({className}: { className?: string }) => {
  const user = useSelector(selectUser)
  return (
    <div
      className={`${className} flex items-center gap-2`}
    >
      <UserBadgeIcon/>
      <p>{user?.username}</p>
    </div>
  )
}