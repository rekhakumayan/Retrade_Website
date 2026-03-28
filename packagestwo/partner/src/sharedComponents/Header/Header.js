import styles from "./Header.module.css"
export default function Header({ title, subtitle, rightContent }) {
  return (
    <div className="row align-items-center mb-4 g-3">

      {/* Left Side */}
      <div className="col-12  col-sm-8 col-md-8 col-lg-9 col-xl-9 col-xxl-10">
        <h1 className={`mb-1 ${styles.title}`}>{title}</h1>
        {subtitle && (
          <p className="text-muted mb-0 small">{subtitle}</p>
        )}
      </div>

      {/* Right Side */}
      {rightContent && (
        <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-2 text-md-end">
          {rightContent}
        </div>
      )}

    </div>
  );
}