import type { SiteLocale } from "./i18n";

type AiTool = {
  id: "chatgpt" | "claude" | "gemini";
  name: string;
  capabilities: string;
  usage: string;
};

type AiContent = {
  title: string;
  intro: string;
  capabilitiesLabel: string;
  usageLabel: string;
  safeguards: string;
  disclaimer: string;
  tools: AiTool[];
};

export const aiToolsContent: Record<SiteLocale, AiContent> = {
  en: {
    title: "AI assistants, guided by a developer",
    intro: "ChatGPT, Claude and Gemini help me move from your idea to a working application. I choose the tool for the task; they support my work, not replace engineering decisions.",
    capabilitiesLabel: "What it can help with",
    usageLabel: "How I use it for your application",
    safeguards: "My workflow: understand your needs → compare approaches → implement → review and test → deploy. I check generated code, security, accessibility and real application behavior. AI can make mistakes; I remain responsible for technical decisions. No passwords or confidential client data are shared without an agreed, suitable data-handling setup. Features, subscriptions and API costs depend on the chosen service.",
    disclaimer: "Product names and logos identify the tools only; no partnership or endorsement is implied.",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "Explain ideas, draft specifications and content, suggest code and help investigate errors.", usage: "I use it to clarify user journeys, explore implementation options and prepare code or test drafts that I then adapt and verify." },
      { id: "claude", name: "Claude", capabilities: "Analyze supplied documents and code, reason about architecture, and suggest refactoring or tests.", usage: "I use it to examine application logic, challenge design choices and improve code clarity, with changes checked against your requirements." },
      { id: "gemini", name: "Gemini", capabilities: "Work with text, images and documents in supported versions, explain information and assist with code.", usage: "I use it to analyze supplied interface references, structure content and compare technical approaches before implementing and testing the selected solution." },
    ],
  },
  fr: {
    title: "Des assistants IA, pilotés par un développeur",
    intro: "ChatGPT, Claude et Gemini m’aident à passer de votre idée à une application fonctionnelle. Je choisis l’outil selon la tâche : ils accompagnent mon travail, sans remplacer les décisions de conception.",
    capabilitiesLabel: "Ce que cette IA peut apporter",
    usageLabel: "Comment je l’utilise pour votre application",
    safeguards: "Ma méthode : comprendre vos besoins → comparer les approches → développer → relire et tester → déployer. Je vérifie le code proposé, la sécurité, l’accessibilité et le fonctionnement réel de l’application. Les IA peuvent se tromper ; je reste responsable des choix techniques. Aucun mot de passe ni donnée client confidentielle n’est partagé sans un cadre de traitement adapté et convenu. Les fonctionnalités, abonnements et coûts d’API dépendent du service choisi.",
    disclaimer: "Les noms et logos identifient uniquement les outils utilisés ; ils n’indiquent aucun partenariat ni recommandation de leurs éditeurs.",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "Expliquer une idée, préparer un cahier des charges ou du contenu, proposer du code et aider à analyser des erreurs.", usage: "Je l’utilise pour clarifier les parcours utilisateurs, explorer des solutions et préparer des bases de code ou de tests que j’adapte et vérifie ensuite." },
      { id: "claude", name: "Claude", capabilities: "Analyser des documents et du code fournis, réfléchir à l’architecture et proposer des améliorations ou des tests.", usage: "Je l’utilise pour examiner la logique de l’application, confronter les choix de conception et rendre le code plus clair, en vérifiant chaque modification par rapport à vos besoins." },
      { id: "gemini", name: "Gemini", capabilities: "Exploiter du texte, des images et des documents selon la version utilisée, expliquer des informations et assister le développement.", usage: "Je l’utilise pour analyser vos références d’interface, structurer le contenu et comparer les approches techniques avant de développer et tester la solution retenue." },
    ],
  },
  de: {
    title: "KI-Assistenten unter Entwicklerleitung",
    intro: "ChatGPT, Claude und Gemini helfen mir, Ihre Idee in eine funktionierende Anwendung umzusetzen. Ich wähle das Werkzeug passend zur Aufgabe; es unterstützt meine Arbeit, ersetzt aber keine technischen Entscheidungen.",
    capabilitiesLabel: "Wobei die KI helfen kann",
    usageLabel: "So nutze ich sie für Ihre Anwendung",
    safeguards: "Mein Ablauf: Anforderungen verstehen → Ansätze vergleichen → entwickeln → prüfen und testen → bereitstellen. Ich überprüfe generierten Code, Sicherheit, Barrierefreiheit und das tatsächliche Verhalten. KI kann Fehler machen; technische Entscheidungen bleiben meine Verantwortung. Passwörter und vertrauliche Kundendaten werden nicht ohne vereinbarte, geeignete Datenverarbeitung weitergegeben. Funktionen, Abonnements und API-Kosten hängen vom gewählten Dienst ab.",
    disclaimer: "Namen und Logos kennzeichnen lediglich die Werkzeuge; sie bedeuten keine Partnerschaft oder Empfehlung durch die Anbieter.",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "Ideen erklären, Anforderungen und Inhalte entwerfen, Code vorschlagen und Fehler untersuchen helfen.", usage: "Ich nutze es, um Nutzerabläufe zu klären, Lösungswege zu erkunden und Code- oder Testentwürfe vorzubereiten, die ich anschließend anpasse und prüfe." },
      { id: "claude", name: "Claude", capabilities: "Bereitgestellte Dokumente und Code analysieren, Architektur durchdenken sowie Refactoring und Tests vorschlagen.", usage: "Ich nutze es, um Anwendungslogik zu untersuchen, Entwurfsentscheidungen zu hinterfragen und Code verständlicher zu machen. Änderungen prüfe ich anhand Ihrer Anforderungen." },
      { id: "gemini", name: "Gemini", capabilities: "Je nach Version mit Text, Bildern und Dokumenten arbeiten, Informationen erklären und beim Programmieren unterstützen.", usage: "Ich nutze es, um bereitgestellte Oberflächenreferenzen zu analysieren, Inhalte zu strukturieren und technische Ansätze zu vergleichen, bevor ich die gewählte Lösung umsetze und teste." },
    ],
  },
  es: {
    title: "Asistentes de IA, dirigidos por un desarrollador",
    intro: "ChatGPT, Claude y Gemini me ayudan a convertir su idea en una aplicación funcional. Elijo la herramienta según la tarea: apoya mi trabajo, sin sustituir las decisiones de ingeniería.",
    capabilitiesLabel: "En qué puede ayudar",
    usageLabel: "Cómo la utilizo para su aplicación",
    safeguards: "Mi método: comprender sus necesidades → comparar enfoques → desarrollar → revisar y probar → desplegar. Verifico el código generado, la seguridad, la accesibilidad y el funcionamiento real. La IA puede cometer errores; las decisiones técnicas siguen siendo mi responsabilidad. No comparto contraseñas ni datos confidenciales de clientes sin un tratamiento de datos adecuado y acordado. Las funciones, suscripciones y costes de API dependen del servicio elegido.",
    disclaimer: "Los nombres y logotipos identifican únicamente las herramientas; no implican colaboración ni respaldo de sus proveedores.",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "Explicar ideas, preparar requisitos y contenidos, proponer código y ayudar a investigar errores.", usage: "Lo utilizo para aclarar recorridos de usuario, explorar soluciones y preparar borradores de código o pruebas que después adapto y verifico." },
      { id: "claude", name: "Claude", capabilities: "Analizar documentos y código proporcionados, razonar sobre la arquitectura y proponer mejoras o pruebas.", usage: "Lo utilizo para examinar la lógica de la aplicación, contrastar decisiones de diseño y mejorar la claridad del código, comprobando los cambios con sus requisitos." },
      { id: "gemini", name: "Gemini", capabilities: "Trabajar con texto, imágenes y documentos según la versión, explicar información y ayudar con el desarrollo.", usage: "Lo utilizo para analizar referencias de interfaz, estructurar contenidos y comparar enfoques técnicos antes de implementar y probar la solución elegida." },
    ],
  },
  km: {
    title: "ជំនួយការ AI ក្រោមការណែនាំពីអ្នកអភិវឌ្ឍ",
    intro: "ChatGPT, Claude និង Gemini ជួយខ្ញុំពីដំណាក់កាលគំនិតរបស់អ្នក រហូតដល់កម្មវិធីអាចដំណើរការ។ ខ្ញុំជ្រើសរើសឧបករណ៍តាមការងារ ដោយប្រើវាជាជំនួយ មិនមែនជំនួសការសម្រេចចិត្តផ្នែកវិស្វកម្មទេ។",
    capabilitiesLabel: "អ្វីដែលវាអាចជួយបាន",
    usageLabel: "របៀបប្រើវាសម្រាប់កម្មវិធីរបស់អ្នក",
    safeguards: "លំហូរការងាររបស់ខ្ញុំ៖ ស្វែងយល់តម្រូវការ → ប្រៀបធៀបវិធីសាស្ត្រ → អនុវត្ត → ពិនិត្យ និងសាកល្បង → ដាក់ឱ្យប្រើ។ ខ្ញុំពិនិត្យកូដដែលបានបង្កើត សុវត្ថិភាព ភាពងាយប្រើ និងអាកប្បកិរិយាពិតរបស់កម្មវិធី។ AI អាចមានកំហុស ដូច្នេះខ្ញុំទទួលខុសត្រូវចំពោះការសម្រេចចិត្តបច្ចេកទេស។ ខ្ញុំមិនចែករំលែកពាក្យសម្ងាត់ ឬទិន្នន័យសម្ងាត់របស់អតិថិជនទេ លុះត្រាតែមានការរៀបចំគ្រប់គ្រងទិន្នន័យសមស្រប និងបានព្រមព្រៀង។ មុខងារ ការជាវ និងថ្លៃ API អាស្រ័យលើសេវាកម្មដែលបានជ្រើសរើស។",
    disclaimer: "ឈ្មោះ និងរូបសញ្ញាផលិតផលបង្ហាញតែឧបករណ៍ប៉ុណ្ណោះ មិនមានន័យថាជាដៃគូ ឬទទួលបានការគាំទ្រពីក្រុមហ៊ុនទាំងនោះទេ។",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "ជួយពន្យល់គំនិត រៀបចំតម្រូវការ និងខ្លឹមសារ ផ្តល់យោបល់កូដ និងស្វែងរកមូលហេតុកំហុស។", usage: "ខ្ញុំប្រើវាដើម្បីកំណត់ដំណើររបស់អ្នកប្រើ ស្វែងរកជម្រើសអនុវត្ត និងរៀបចំសេចក្តីព្រាងកូដ ឬការសាកល្បង ដែលខ្ញុំកែសម្រួល និងផ្ទៀងផ្ទាត់បន្ទាប់។" },
      { id: "claude", name: "Claude", capabilities: "វិភាគឯកសារ និងកូដដែលបានផ្តល់ ពិចារណាស្ថាបត្យកម្ម និងណែនាំការរៀបចំកូដឡើងវិញ ឬការសាកល្បង។", usage: "ខ្ញុំប្រើវាដើម្បីពិនិត្យតក្កវិជ្ជាកម្មវិធី សាកសួរជម្រើសរចនា និងធ្វើឱ្យកូដច្បាស់ឡើង ដោយពិនិត្យការកែប្រែតាមតម្រូវការរបស់អ្នក។" },
      { id: "gemini", name: "Gemini", capabilities: "ធ្វើការជាមួយអត្ថបទ រូបភាព និងឯកសារតាមសមត្ថភាពរបស់កំណែដែលបានប្រើ ពន្យល់ព័ត៌មាន និងជួយការងារកូដ។", usage: "ខ្ញុំប្រើវាដើម្បីវិភាគឯកសារយោងចំណុចប្រទាក់ដែលអ្នកផ្តល់ រៀបចំខ្លឹមសារ និងប្រៀបធៀបវិធីសាស្ត្របច្ចេកទេស មុនពេលអនុវត្ត និងសាកល្បងដំណោះស្រាយដែលបានជ្រើសរើស។" },
    ],
  },
  zh: {
    title: "由开发者把关的 AI 助手",
    intro: "ChatGPT、Claude 和 Gemini 能协助我将你的想法推进为可运行的应用。我会根据任务选择工具；它们辅助工作，但不会代替工程判断。",
    capabilitiesLabel: "可以提供哪些帮助",
    usageLabel: "我如何将其用于你的应用",
    safeguards: "我的流程：了解需求 → 比较方案 → 实施 → 审查与测试 → 部署。我会检查生成的代码、安全性、无障碍体验和应用的实际表现。AI 可能出错，技术决策仍由我负责。未经约定且不具备适当数据处理安排时，不会共享密码或客户机密数据。功能、订阅和 API 费用取决于所选服务。",
    disclaimer: "产品名称和标识仅用于说明所使用的工具，不代表存在合作关系或获得厂商背书。",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "解释想法、起草需求和内容、提供代码建议，并协助排查错误。", usage: "我用它梳理用户流程、探索实现方案，并准备代码或测试草稿，之后会根据项目需要调整和验证。" },
      { id: "claude", name: "Claude", capabilities: "分析提供的文档和代码、推敲架构，并提出重构或测试建议。", usage: "我用它检查应用逻辑、审视设计选择并提升代码可读性，同时依据你的需求核对所有改动。" },
      { id: "gemini", name: "Gemini", capabilities: "根据所用版本处理文本、图像和文档，解释信息并辅助编程。", usage: "我用它分析你提供的界面参考、整理内容并比较技术方案，再实施和测试最终选定的方案。" },
    ],
  },
  ja: {
    title: "開発者が判断するAIアシスタント",
    intro: "ChatGPT、Claude、Geminiを活用し、アイデアを動作するアプリへと進めます。タスクに応じてツールを選びますが、あくまで開発を補助するもので、技術的な判断を代替するものではありません。",
    capabilitiesLabel: "活用できること",
    usageLabel: "アプリ開発での活用方法",
    safeguards: "開発の流れ：ニーズを理解 → 方法を比較 → 実装 → レビューとテスト → デプロイ。生成コード、安全性、アクセシビリティ、実際のアプリの動作を確認します。AIは誤ることがあり、技術的な判断は私が責任を持って行います。適切なデータ取り扱いについて合意がない限り、パスワードや顧客の機密データは共有しません。機能、サブスクリプション、API費用は選択するサービスによって異なります。",
    disclaimer: "製品名とロゴはツールを示す目的でのみ使用しており、提携や提供元による推薦を意味しません。",
    tools: [
      { id: "chatgpt", name: "ChatGPT", capabilities: "アイデアの説明、要件やコンテンツの草案作成、コード提案、エラー調査を支援します。", usage: "ユーザーフローの整理や実装方法の検討、コード・テストの草案作成に活用し、その後、内容を調整して検証します。" },
      { id: "claude", name: "Claude", capabilities: "提供された文書やコードの分析、アーキテクチャの検討、リファクタリングやテストの提案に役立ちます。", usage: "アプリのロジックを確認し、設計上の選択肢を見直してコードの明瞭さを高めるために使います。変更内容は要件に照らして確認します。" },
      { id: "gemini", name: "Gemini", capabilities: "利用するバージョンに応じてテキスト、画像、文書を扱い、情報の説明やコーディングを支援します。", usage: "提供された画面イメージの分析、コンテンツの整理、技術案の比較に活用し、選んだ方法を実装してテストします。" },
    ],
  },
};
