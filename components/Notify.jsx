import React from 'react';
import toast from 'react-hot-toast'

const Notify = () => {

    const notify = () => toast.success("Categoria enviada!", {
        position: 'top-right',
        duration: 3000,
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#fff',
            secondary: '#000',
        },
    });

    return notify
}

export default Notify;
