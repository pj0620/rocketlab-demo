import TreeItem from '@mui/lab/TreeItem';
import { RocketNodeI } from '../../types';

interface RocketNodeProps {
  name: string,
  children: RocketNodeI|number
}

function RocketNode({name, children} : RocketNodeProps) {
  function coloredSpan(value:number) {
    return value >= 10
      ? <span style={{color: 'green'}}>{value}</span>
      : <span>{value}</span>;
  }

  return (  
    <TreeItem nodeId={`${name}-${(Math.random() + 1).toString(36).substring(7)}`} label={name}>
      {
      typeof children  === 'number'
        ? coloredSpan(children)
        : Object.entries(children).map(([key, value]) => (
            <RocketNode key={`${name}-${key}-${(Math.random() + 1).toString(36).substring(7)}`} name={key} children={value}/>
          ))
      }
    </TreeItem>
  );
}

export default RocketNode;
