import { TopPoolsData } from 'data/static/token-data';
import CurrencySwapIcons from '/components/ui/currency-swap-icons';
export default function TopPools() {
    return (<div className="rounded-lg bg-white p-6 shadow-card dark:bg-light-dark sm:p-8">
      <h3 className="mb-6 text-base font-medium uppercase">Top Pools</h3>
      <div className="mb-5 grid grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="col-span-2">Pool</div>
        <div>Volume</div>
      </div>

      {TopPoolsData.map((pool, index) => {
            let from = pool.from;
            let to = pool.to;
            return (<div className="mb-5 grid grid-cols-3 gap-4 text-sm text-gray-900 last:mb-0 dark:text-white" key={index}>
            <div className="col-span-2 flex items-center gap-2">
              <CurrencySwapIcons from={from} to={to}/>
            </div>
            <div>{pool.volume}</div>
          </div>);
        })}
    </div>);
}
