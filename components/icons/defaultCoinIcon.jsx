export function DefaultCoinIcon({symbol = "0x"}) {
    return (
      <span className={`rounded-full border-2 border-solid border-white bg-gradient-to-r from-gray-300 to-gray-700 dark:border-gray-800 w-9 h-9`}> <div className="uppercase p-1 text-white ">{symbol}</div></span>
    );
}
