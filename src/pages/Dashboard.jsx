import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/useAuth.js'
import { useLearning } from '../context/useLearning.js'
import { learningPaths } from '../data/learningPaths.js'

const weekDays = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج']
const weekHours = [30, 48, 37, 66, 45, 80, 52]

export default function Dashboard() {
  const { user } = useAuth()
  const { selectedTrackId, completedSkills, toggleSkill } = useLearning()
  const path = learningPaths.find((item) => item.id === selectedTrackId) || learningPaths[0]
  const completed = completedSkills[path.id] || []
  const percent = Math.round((completed.length / path.skills.length) * 100)
  const nextSkill = path.skills.find((skill) => !completed.includes(skill.id))
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'صديقي'

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div>
          <span className="eyebrow">الأربعاء، ١٩ نوفمبر ٢٠٢٦ <span className="eyebrow-dot" /> رحلتك مستمرة</span>
          <h1>أهلاً {firstName}، <span>جاهزة لخطوة جديدة؟</span></h1>
          <p>كل مهارة تتعلمينها تقرّبك أكثر من مستقبلك اللي تحلمين فيه.</p>
        </div>
        <Link className="button button-primary" to="/paths">استكشفي المسارات <Icon name="arrow" size={17} /></Link>
      </section>

      <section className="stats-grid" aria-label="ملخص التقدم">
        <article className="stat-card">
          <span className="stat-icon violet-bg"><Icon name="target" /></span>
          <div><span className="stat-label">المسار الحالي</span><strong className="stat-main">{path.title}</strong><span className="stat-meta">{path.subtitle}</span></div>
          <span className="stat-corner"><Icon name="arrow" size={16} /></span>
        </article>
        <article className="stat-card">
          <span className="stat-icon mint-bg"><Icon name="check" /></span>
          <div><span className="stat-label">مهارات مكتملة</span><strong className="stat-number">{completed.length}<small> / {path.skills.length}</small></strong><span className="stat-meta">أنتِ على الطريق الصحيح</span></div>
          <span className="stat-corner"><Icon name="arrow" size={16} /></span>
        </article>
        <article className="stat-card">
          <span className="stat-icon peach-bg"><Icon name="clock" /></span>
          <div><span className="stat-label">الوقت المقترح</span><strong className="stat-number">{path.duration}</strong><span className="stat-meta">تعلّم على راحتك</span></div>
          <span className="stat-corner"><Icon name="arrow" size={16} /></span>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel progress-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">خطة التعلّم</span><h2>مسارك خطوة بخطوة</h2></div>
            <span className="progress-pill">{percent}% مكتمل</span>
          </div>
          <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
          <div className="progress-caption"><span>{completed.length} من {path.skills.length} مهارات</span><span>استمري، إنجازك يتراكم ✨</span></div>
          <div className="skill-list">
            {path.skills.map((skill, index) => {
              const isComplete = completed.includes(skill.id)
              const isNext = !isComplete && !path.skills.slice(0, index).some((item) => !completed.includes(item.id))
              return (
                <button
                  type="button"
                  className={`skill-row ${isComplete ? 'skill-complete' : ''} ${isNext ? 'skill-next' : ''}`}
                  key={skill.id}
                  onClick={() => toggleSkill(path.id, skill.id)}
                  aria-pressed={isComplete}
                  title={isComplete ? 'اضغطي لإلغاء الإنجاز' : 'حددي المهارة كمنجزة'}
                >
                  <span className="skill-check">{isComplete && <Icon name="check" size={15} />}</span>
                  <span className="skill-copy"><strong>{skill.title}</strong><small>{skill.detail}</small></span>
                  <span className={`skill-status ${isComplete ? 'done' : ''}`}>{isComplete ? 'مكتملة' : isNext ? 'ابدئي الآن' : `${index + 1}`}</span>
                </button>
              )
            })}
          </div>
          <Link className="text-link" to="/paths">عرض تفاصيل المسار <Icon name="chevron" size={15} /></Link>
        </article>

        <div className="right-column">
          <article className="focus-card">
            <div className="focus-card-top"><span className="focus-icon"><Icon name={path.icon} size={21} /></span><span className="focus-tag">خطوتك القادمة</span></div>
            <h2>{nextSkill ? nextSkill.title : 'أكملتِ المسار!'}</h2>
            <p>{nextSkill ? nextSkill.detail : 'إنجاز رائع! اكتشفي مساراً جديداً وواصلي التعلّم.'}</p>
            <Link to={nextSkill ? '/resources' : '/paths'} className="focus-link">{nextSkill ? 'اكتشفي مصادر التعلّم' : 'استكشفي المسارات'} <Icon name="arrow" size={16} /></Link>
            <div className="focus-decoration">✳</div>
          </article>
          <article className="panel activity-panel">
            <div className="panel-heading compact-heading"><div><span className="section-kicker">عادات صغيرة، نتائج كبيرة</span><h2>نشاطك هذا الأسبوع</h2></div><button type="button" className="more-button" aria-label="خيارات النشاط">•••</button></div>
            <div className="chart-summary"><strong>٣.٥ <small>ساعات</small></strong><span className="chart-change">↑ ١٢٪ <i>عن الأسبوع الماضي</i></span></div>
            <div className="week-chart" aria-label="النشاط خلال أيام الأسبوع">
              {weekDays.map((day, index) => <div className="chart-day" key={day}><span className="chart-bar" style={{ height: `${weekHours[index]}%` }} /><small>{day}</small></div>)}
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-explore">
        <div className="explore-heading">
          <div><span className="section-kicker">خيارات أكثر لمستقبلك</span><h2>استكشفي مجالات تقنية جديدة</h2></div>
          <Link to="/paths">كل المسارات <Icon name="chevron" size={15} /></Link>
        </div>
        <div className="explore-cards">
          {learningPaths.filter((item) => item.id !== path.id).slice(0, 3).map((item) => (
            <Link className="explore-card" to="/paths" key={item.id}>
              <span className={`explore-icon ${item.color}`}><Icon name={item.icon} size={19} /></span>
              <span className="explore-card-copy"><strong>{item.title}</strong><small>{item.duration} <span>·</span> {item.level}</small></span>
              <Icon name="chevron" size={16} className="explore-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="start-guide">
        <div className="guide-heading"><span className="section-kicker">كيف تبدئين؟</span><h2>مشوارك من ٣ خطوات</h2></div>
        <div className="guide-steps">
          <article><span className="guide-number">١</span><div><strong>اختاري المجال</strong><p>تصفّحي المسارات واختاري ما يثير فضولك.</p></div></article>
          <article><span className="guide-number">٢</span><div><strong>تعلّمي مهارة واحدة</strong><p>ابدئي بالخطوة التالية في خطتك، بدون استعجال.</p></div></article>
          <article><span className="guide-number">٣</span><div><strong>طبّقي واحتفلي</strong><p>حددي المهارات المنجزة وراقبي تقدّمك.</p></div></article>
        </div>
      </section>

      <section className="bottom-banner">
        <span className="banner-spark"><Icon name="sparkles" size={21} /></span>
        <div><strong>كل الخبراء كانوا مبتدئين في يوم من الأيام.</strong><span>خذي وقتك، واحتفلي بكل خطوة صغيرة.</span></div>
        <Link to="/resources">مصادر تساعدك <Icon name="chevron" size={15} /></Link>
      </section>
    </div>
  )
}
