import {IconButton, Tooltip, Whisper} from "rsuite"
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import {ReactNode} from "react";


export const InfoTooltip = ({node,className}:{node:ReactNode,className?:string}) => {

  const tooltip = (
    <Tooltip>
      {node}
    </Tooltip>
  );


  return (
    <Whisper className={'shrink-0'}  placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
      <IconButton className={className} circle icon={<InfoOutlineIcon />} appearance="default" />
    </Whisper>

    )
}