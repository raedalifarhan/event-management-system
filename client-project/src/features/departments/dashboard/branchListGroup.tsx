import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { FaFilter } from 'react-icons/fa';

const BranchListGroup = () => {
    const { branchStore } = useStore();
    const { branchesKeyValueList } = branchStore;

    return (
        <div>
            <div className="bg-yellow-500 p-3 mb-2 rounded-md text-lg flex items-center gap-3">
                <FaFilter color="yellow" />
                <span className="text-white">Branches</span>
            </div>
            <ul className="w-full text-base font-medium text-gray-900 bg-white border border-gray-200
                rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {branchesKeyValueList &&
                    branchesKeyValueList.map((branch) => (
                        <li
                            key={branch.id}
                            className="w-full px-4 py-2 border-b border-gray-200 rounded-sm dark:border-gray-600"
                        >
                            {branch.branchName}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default observer(BranchListGroup);
