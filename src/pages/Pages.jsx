import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useLearning } from '../context/useLearning.js'
import { learningPaths } from '../data/learningPaths.js'

const resourcesByPath = {
  frontend: [
    { title: 'دليل تعلّم تطوير الويب', description: 'مسار مجاني من MDN لتعلّم HTML وCSS وJavaScript من الأساس.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
    { title: 'تحديات واجهات عملية', description: 'طبّقي مهاراتك على تصميمات حقيقية وابني معرض أعمالك.', icon: 'code', color: 'mint', label: 'تطبيق عملي', action: 'شاهدي التحديات', url: 'https://www.frontendmentor.io/challenges' },
    { title: 'فرص تطوير الواجهات', description: 'استكشفي فرص التدريب والعمل المناسبة لمهاراتك.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=Front%20End%20Developer' },
  ],
  backend: [
    { title: 'تعلّم Node.js', description: 'دليل Node.js الرسمي لبناء تطبيقات وخدمات تعمل على الخادم.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
    { title: 'تدريب Back End وواجهات API', description: 'دروس ومشاريع عملية لتطبيق مفاهيم الخادم وواجهات API.', icon: 'server', color: 'mint', label: 'تطبيق عملي', action: 'شاهدي المشاريع', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' },
    { title: 'فرص تطوير الواجهات الخلفية', description: 'ابحثي عن فرص تدريب وعمل في تطوير الخوادم.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=Back%20End%20Developer' },
  ],
  uiux: [
    { title: 'مكتبة موارد Figma', description: 'مقالات وأدلة تساعدك على تعلّم تصميم المنتجات وتجربة المستخدم.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://www.figma.com/resource-library/' },
    { title: 'تحديات تصميم UX', description: 'تدرّبي على حل مشكلات وتجارب تصميم مستوحاة من الواقع.', icon: 'sparkles', color: 'mint', label: 'تطبيق عملي', action: 'شاهدي التحديات', url: 'https://uxtools.co/challenges/' },
    { title: 'فرص تصميم تجربة المستخدم', description: 'استكشفي فرص التدريب والعمل في تصميم المنتجات الرقمية.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=UX%20Designer' },
  ],
  data: [
    { title: 'تعلّم SQL', description: 'دليل تفاعلي لتعلّم استعلامات قواعد البيانات خطوة بخطوة.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://sqlbolt.com/' },
    { title: 'مشاريع تحليل بيانات', description: 'تدربي على التحليل واستكشاف البيانات باستخدام Python.', icon: 'target', color: 'mint', label: 'تطبيق عملي', action: 'شاهدي المشاريع', url: 'https://www.kaggle.com/learn' },
    { title: 'فرص تحليل البيانات', description: 'استكشفي فرص التدريب والعمل في تحليل البيانات.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=Data%20Analyst' },
  ],
  mobile: [
    { title: 'دليل React Native', description: 'ابدئي ببناء تطبيقات iOS وAndroid باستخدام React Native.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://reactnative.dev/docs/getting-started' },
    { title: 'تدريب React Native', description: 'تعلّمي من خلال دروس ومشاريع تطبيقية منظمة.', icon: 'code', color: 'mint', label: 'تطبيق عملي', action: 'شاهدي الدروس', url: 'https://www.freecodecamp.org/news/tag/react-native/' },
    { title: 'فرص تطوير تطبيقات الجوال', description: 'ابحثي عن فرص تدريب وعمل في تطوير تطبيقات الجوال.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=Mobile%20Developer' },
  ],
  python: [
    { title: 'دليل Python للمبتدئين', description: 'توثيق Python الرسمي للبدء والتعرّف على أساسيات اللغة.', icon: 'book', color: 'violet', label: 'مرجع تعلّم', action: 'ابدئي التعلّم', url: 'https://docs.python.org/3/tutorial/' },
    { title: 'تحديات Python تفاعلية', description: 'تدربي على كتابة Python وحل مسائل برمجية قصيرة.', icon: 'code', color: 'mint', label: 'تطبيق عملي', action: 'ابدئي التحديات', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/' },
    { title: 'فرص Python للمبتدئين', description: 'استكشفي فرص تدريب وعمل مرتبطة ببرمجة Python.', icon: 'arrow', color: 'peach', label: 'فرص مهنية', action: 'استكشفي الفرص', url: 'https://www.linkedin.com/jobs/search/?keywords=Python%20Developer' },
  ],
}

export function PathsPage() {
  const { selectedTrackId, selectTrack, completedSkills } = useLearning()
  const [query, setQuery] = useState('')
  const filteredPaths = learningPaths.filter((path) =>
    `${path.title} ${path.subtitle} ${path.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function choosePath(pathId) {
    selectTrack(pathId)
  }

  return (
    <div className="subpage">
      <div className="subpage-heading">
        <span className="eyebrow">اختاري وجهتك</span>
        <h1>مسارك المهني يبدأ من هنا</h1>
        <p>استكشفي {learningPaths.length} مسارات تقنية، واختاري المجال الأقرب لاهتماماتك.</p>
      </div>
      <label className="path-search">
        <Icon name="target" size={18} />
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحثي عن مسار، مثل Python أو التصميم..." aria-label="ابحثي عن مسار" />
        {query && <button type="button" onClick={() => setQuery('')}>مسح</button>}
      </label>
      <div className="path-cards">
        {filteredPaths.map((path) => {
          const isSelected = selectedTrackId === path.id
          const done = (completedSkills[path.id] || []).length
          return (
            <article className={`path-card ${isSelected ? 'path-card-selected' : ''}`} key={path.id}>
              <div className={`path-icon ${path.color}`}><Icon name={path.icon} size={24} /></div>
              {isSelected && <span className="selected-label"><Icon name="check" size={13} /> مسارك الحالي</span>}
              <span className="path-subtitle">{path.subtitle}</span>
              <h2>{path.title}</h2>
              <p>{path.description}</p>
              <div className="path-meta"><span><Icon name="clock" size={15} /> {path.duration}</span><span>{path.level}</span></div>
              <div className="path-progress-copy">{done} من {path.skills.length} مهارات مكتملة</div>
              <div className="progress-track small-track"><span style={{ width: `${(done / path.skills.length) * 100}%` }} /></div>
              <button type="button" className={isSelected ? 'button button-selected' : 'button button-outline'} onClick={() => choosePath(path.id)}>
                {isSelected ? 'المسار المحدد' : 'اختاري هذا المسار'} {isSelected ? <Icon name="check" size={16} /> : <Icon name="arrow" size={16} />}
              </button>
            </article>
          )
        })}
      </div>
      {!filteredPaths.length && <div className="empty-search">ما لقينا مسار بهذا الاسم. جرّبي كلمة ثانية.</div>}
      <div className="help-callout"><span className="callout-icon"><Icon name="sparkles" size={19} /></span><p><strong>مو متأكدة أي مسار يناسبك؟</strong> لا تشيلي هم، تقدري تغيّري مسارك بأي وقت.</p><Link to="/resources">اكتشفي المصادر <Icon name="chevron" size={14} /></Link></div>
    </div>
  )
}

export function ResourcesPage() {
  const { selectedTrackId } = useLearning()
  const path = learningPaths.find((item) => item.id === selectedTrackId) || learningPaths[0]
  const resources = resourcesByPath[path.id] || resourcesByPath.frontend

  return (
    <div className="subpage">
      <div className="subpage-heading">
        <span className="eyebrow">معك في كل خطوة</span>
        <h1>مصادر وفرص تفتح لك أبواب</h1>
        <p>مصادر مختارة لمسار {path.title} تساعدك تتعلمين وتستعدين للخطوة اللي بعدها.</p>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <article className="resource-card" key={resource.label}>
            <div className={`resource-icon ${resource.color}`}><Icon name={resource.icon} size={22} /></div>
            <span className="resource-label">{resource.label}</span>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a className="resource-link" href={resource.url} target="_blank" rel="noreferrer">
              {resource.action} <Icon name="arrow" size={14} />
            </a>
          </article>
        ))}
      </div>
      <section className="resource-tip"><span className="tip-mark">✦</span><div><span className="section-kicker">نصيحة مشوار</span><h2>الممارسة تصنع الفرق.</h2><p>بعد كل مهارة جديدة، جرّبي تطبيقها في مشروع صغير وشاركيه مع الآخرين.</p></div><Link className="button button-primary" to="/paths">تابعي مسارك <Icon name="arrow" size={16} /></Link></section>
    </div>
  )
}
