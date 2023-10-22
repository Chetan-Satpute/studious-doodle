import Card from '@mui/material/Card';
import Check from '@mui/icons-material/Check';
import Code from './Code';
import {IStackFunction} from '../lib/step';

interface IProps extends IStackFunction {}

function StackFunction(props: IProps) {
  const {code, done} = props;

  return (
    <Card
      elevation={0}
      className="no-scrollbar flex items-center gap-2 overflow-x-auto p-0 bg-transparent"
    >
      {done ? (
        <Check color="success" />
      ) : (
        <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent" />
      )}
      <Code text={code} />
    </Card>
  );
}

export default StackFunction;
