const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
          <p className="label text-white">{`${label}`}</p>
          <p className="intro text-emerald-400">{`Sales: ${payload[0].value}`}</p>
          <p className="intro text-blue-400">{`Revenue: ₦${Number(
            payload[1].value
          ).toLocaleString("en-NG")}`}</p>
        </div>
      );
    }

    return null;
  };

  export default CustomTooltip;