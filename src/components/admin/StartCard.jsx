function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-[#102B46] mt-3">
            {value}
          </h3>
        </div>

        <div className="w-11 h-11 rounded-lg bg-[#F4B928]/15 flex items-center justify-center">
          {Icon && <Icon size={21} className="text-[#102B46]" />}
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-400 mt-4">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;
