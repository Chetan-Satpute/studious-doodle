import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import {FunctionType, IFunctionInfo} from '../lib/func';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {updateFunctionArg} from '../redux/structure/structureSlice';
import {runFunction} from '../redux/thunks/runFunction';

interface IProps extends IFunctionInfo {}

function FunctionCard(props: IProps) {
  const {name, id, args, type} = props;

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

  console.log(id, type);

  return (
    <Card elevation={5} className="flex flex-col">
      <span className="font-kalam font-normal p-3">{name}</span>

      <div className="flex flex-col">{argFields}</div>

      <div className="flex">
        {type !== FunctionType.AnimateOnly && (
          <Button
            className={`flex-1 rounded-t-none ${
              type === FunctionType.RunAndAnimate ? 'rounded-br-none' : ''
            }`}
            variant="outlined"
            color="secondary"
            endIcon={<SkipNextRounded />}
            onClick={() => handleRunFunction(false)}
          >
            Run
          </Button>
        )}
        {type !== FunctionType.RunOnly && (
          <Button
            className={`flex-1 rounded-none ${
              type === FunctionType.RunAndAnimate ? 'rounded-bl-none' : ''
            }`}
            variant="contained"
            color="success"
            endIcon={<PlayArrowRounded />}
            onClick={() => handleRunFunction(true)}
          >
            Animate
          </Button>
        )}
      </div>
    </Card>
  );
}

export default FunctionCard;
