import React, {Suspense} from 'react';

interface Props {
    children: React.ReactNode | React.ReactNode[]
}

const SuspenseWrap = (props: Props) => {
    return (
       <Suspense fallback={<div>...loading</div>}>
           {props.children}
       </Suspense>
    );
};

export default SuspenseWrap;