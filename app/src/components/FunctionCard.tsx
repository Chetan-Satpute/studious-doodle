import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import {IFunctionInfo} from '../lib/func';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {updateFunctionArg} from '../redux/structure/structureSlice';
import {runFunction} from '../redux/thunks/runFunction';

interface IProps extends IFunctionInfo {}

function FunctionCard(props: IProps) {
  const {name, id, args} = props;

  const dispatch = useAppDispatch();

  const handleRunFunction = (animate: boolean) => {
    dispatch(runFunction(id, animate));
  };

  const argFields = args.map(arg => {
    const handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = e => {
      const txt = e.target.value;

      dispatch(
        updateFunctionArg({
          functionId: id,
          label: arg.label,
          valueTxt: txt,
        })
      );
    };

    return (
      <TextField
        key={arg.label}
        variant="filled"
        label={arg.label + (arg.type === 'number[]' ? ' ★' : '')}
        value={arg.value}
        onChange={handleChange}
      />
    );
  });

  return (
    <Card elevation={5} className="flex flex-col">
      <span className="font-kalam font-normal p-3">{name}</span>

      <div className="flex flex-col">{argFields}</div>

      <div className="flex">
        <Button
          className="flex-1 rounded-t-none rounded-br-none"
          variant="outlined"
          color="secondary"
          endIcon={<SkipNextRounded />}
          onClick={() => handleRunFunction(false)}
        >
          Run
        </Button>
        <Button
          className="w-1/2 rounded-none"
          variant="contained"
          color="success"
          endIcon={<PlayArrowRounded />}
          onClick={() => handleRunFunction(true)}
        >
          Animate
        </Button>
      </div>
    </Card>
  );
}

export default FunctionCard;
