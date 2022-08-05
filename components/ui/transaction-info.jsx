import cn from 'classnames';
export default function TransactionInfo({ label, value, className, }) {
    return (<div className={cn('flex items-center justify-between dark:text-gray-300', className)}>
      <span className="font-medium">{label}</span>
      <span>{value ? value : '_ _'}</span>
    </div>);
}
