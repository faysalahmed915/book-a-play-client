import { FiInbox } from 'react-icons/fi';

const NoData = ({ message, icon }) => {
    const Icon = icon || FiInbox;
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 p-8">
      <Icon className="text-5xl mb-3" />
      <p className="text-lg font-medium">{message || 'No item found'}</p>
    </div>
  );
};

export default NoData;
