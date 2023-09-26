import { Outlet } from 'react-router-dom';

function Content() {
    return (
        <main className="flex-grow">
            <div className="px-2 mx-auto max-w-screen-xl">
                <Outlet />
            </div>
        </main>
    );
}

export default Content;
