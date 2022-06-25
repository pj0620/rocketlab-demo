import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { RocketNodeI } from '../../types';
import { useEffect, useState } from 'react';
import RocketNode from '../RocketNode/RocketNode';
import PropTypes from 'prop-types';

function RocketTree(props: {rocket: RocketNodeI}) {

  const [rocket, setRocket] = useState({} as RocketNodeI);

  // useEffect( () => {
  //   setRocket(props.rocket);
  //   console.log('rocket: ', rocket);
  // }, [c])

  useEffect(() => { setRocket(props.rocket) }, [props.rocket]);

  return (  
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      className="m-3 white-border-round"
      sx={{ height: 240, flexGrow: 1, overflowY: 'auto', color:'white' }}
    >
      <RocketNode name='Rocket' children={rocket['Rocket'] || 3}/>
    </TreeView>
  );
}

RocketTree.propTypes = {
  rocket: PropTypes.object
};

export default RocketTree;
