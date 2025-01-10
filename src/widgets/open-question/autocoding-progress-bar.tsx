import { Progress } from "rsuite";

type Props = {
  percent:number
  status:"success" | "fail" | "active" | undefined
}
export const AutocodingProgressBar = ({percent,status}:Props) => {
  const style = {
    width: 60,
    display: 'inline-block',
    marginRight: 10
  };
  return (
    <div style={style}>
      <Progress.Circle percent={percent} status={status}/>
    </div>
  )
}