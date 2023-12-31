import {changeSidebarView} from '../base/baseSlice';
import {SideBarView} from '../../components/SideBar/types';
import {TAppThunk} from '../store';
import {apiCall} from '../../api';
import {IFunctionInfo} from '../../lib/func';
import {IFrame} from '../../lib/frame';
import {loadStructure} from '../structure/structureSlice';
import {Structure} from '../../lib/structure';

export interface GetStructureResponseBody {
  functions: IFunctionInfo[];
  structureFrame: IFrame;
  structureData: unknown;
}

export function chooseStructure(structure: Structure): TAppThunk {
  return async dispatch => {
    dispatch(changeSidebarView(SideBarView.Loading));

    const {data} = (await apiCall(`/${structure}`, 'GET', null, dispatch)) as {
      status: number;
      data: GetStructureResponseBody;
    };

    dispatch(
      loadStructure({
        structure: structure,
        functionList: data.functions,
        structureData: data.structureData,
        structureFrame: data.structureFrame,
      })
    );
    dispatch(changeSidebarView(SideBarView.Structure));
  };
}
