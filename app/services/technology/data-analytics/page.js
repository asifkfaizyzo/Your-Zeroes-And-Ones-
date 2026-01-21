import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function DataAnalytics() {
  // Icon components for Analytics Maturity
  const DescriptiveIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  const DiagnosticIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const PredictiveIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );

  const PrescriptiveIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="#1a3568" />
    </svg>
  );

  // Icon components for Services
  const StrategyIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );

  const EngineeringIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const VisualizationIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </svg>
  );

  const SpecializedIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );

  // Updated analyticsMaturity array
  const analyticsMaturity = [
    {
      type: "Descriptive Analytics",
      question: "What happened?",
      purpose: "Looks at past data to describe what has occurred",
      examples: [
        "Reporting on last quarter's sales figures",
        "Website traffic analysis",
        "Customer demographics reporting",
        "Monthly performance dashboards",
      ],
      icon: <DescriptiveIcon />,
    },
    {
      type: "Diagnostic Analytics",
      question: "Why did it happen?",
      purpose:
        "Digs deeper into past data to understand the causes of events and behaviors",
      examples: [
        "Analyzing sales drop causes",
        "Root cause analysis for operational issues",
        "Customer behavior pattern analysis",
        "Marketing campaign performance deep-dive",
      ],
      icon: <DiagnosticIcon />,
    },
    {
      type: "Predictive Analytics",
      question: "What is likely to happen?",
      purpose:
        "Uses statistical models and machine learning to forecast future outcomes",
      examples: [
        "Predicting customer churn",
        "Forecasting inventory demand",
        "Sales revenue predictions",
        "Risk assessment modeling",
      ],
      icon: <PredictiveIcon />,
    },
    {
      type: "Prescriptive Analytics",
      question: "What should we do?",
      purpose:
        "Recommends actions to affect desired outcomes or avoid future risks",
      examples: [
        "Optimal discount recommendations",
        "Supply chain optimization routes",
        "Personalized marketing actions",
        "Resource allocation optimization",
      ],
      icon: <PrescriptiveIcon />,
    },
  ];

  // Updated services array
  const services = [
    {
      category: "Data Strategy & Consulting",
      description:
        "Strategic planning and governance for data-driven transformation",
      services: [
        {
          name: "Business Intelligence Strategy",
          description:
            "Designing roadmap for data usage to meet business goals",
        },
        {
          name: "Data Governance & Assessment",
          description:
            "Establishing policies and standards for data management",
        },
        {
          name: "Use Case Identification",
          description: "Pinpointing valuable business problems data can solve",
        },
      ],
      icon: <StrategyIcon />,
    },
    {
      category: "Data Engineering & Management",
      description: "Building robust data infrastructure and pipelines",
      services: [
        {
          name: "Data Integration & ETL/ELT",
          description:
            "Combining data from various sources into centralized repositories",
        },
        {
          name: "Data Warehouse/Lakehouse Design",
          description: "Architecting scalable modern data platforms",
        },
        {
          name: "Data Cleaning & Transformation",
          description: "Ensuring data accuracy and consistency for analysis",
        },
      ],
      icon: <EngineeringIcon />,
    },
    {
      category: "Data Analysis & Visualization",
      description:
        "Transforming data into actionable insights and visualizations",
      services: [
        {
          name: "Dashboard & Report Development",
          description: "Creating interactive BI dashboards for KPI tracking",
        },
        {
          name: "Advanced Analytics",
          description: "Applying statistical analysis and machine learning",
        },
        {
          name: "Ad-hoc Analysis",
          description: "Deep-dive analysis for specific business questions",
        },
      ],
      icon: <VisualizationIcon />,
    },
    {
      category: "Specialized Advanced Analytics",
      description: "Domain-specific analytics solutions for business functions",
      services: [
        {
          name: "Customer Analytics",
          description: "Segmentation, LTV prediction, churn analysis",
        },
        {
          name: "Marketing Analytics",
          description: "Campaign ROI, attribution modeling, market mix",
        },
        {
          name: "Operations Analytics",
          description: "Logistics optimization, predictive maintenance",
        },
        {
          name: "Financial Analytics",
          description: "Fraud detection, risk modeling, forecasting",
        },
      ],
      icon: <SpecializedIcon />,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Scoping",
      description:
        "Understand business objectives, key questions, and available data sources",
      activities: [
        "Stakeholder Interviews",
        "Requirement Gathering",
        "Data Assessment",
        "Scope Definition",
      ],
    },
    {
      step: "02",
      title: "Data Collection & Ingestion",
      description: "Gathering data from all identified sources and systems",
      activities: [
        "Data Source Identification",
        "API Integration",
        "Database Connection",
        "Data Extraction",
      ],
    },
    {
      step: "03",
      title: "Data Preparation & Cleaning",
      description:
        "Handling missing values, correcting errors, and transforming data into usable format",
      activities: [
        "Data Cleaning",
        "Transformation",
        "Quality Assurance",
        "Data Validation",
      ],
    },
    {
      step: "04",
      title: "Exploratory Analysis & Modeling",
      description:
        "Analyzing data to find patterns and building statistical or ML models",
      activities: [
        "Pattern Analysis",
        "Model Development",
        "Feature Engineering",
        "Algorithm Selection",
      ],
    },
    {
      step: "05",
      title: "Visualization & Interpretation",
      description:
        "Creating dashboards and interpreting findings in business context",
      activities: [
        "Dashboard Creation",
        "Report Generation",
        "Insight Synthesis",
        "Business Translation",
      ],
    },
    {
      step: "06",
      title: "Deployment & Automation",
      description:
        "Integrating insights into business processes and automating pipelines",
      activities: [
        "Pipeline Automation",
        "System Integration",
        "Process Implementation",
        "User Training",
      ],
    },
  ];

  const techStack = [
    {
      category: "Cloud Data Warehouses",
      technologies: [
        {
          name: "Snowflake",
          description: "Cloud data platform",
          icon: "/images/data-tools/snowflake.svg",
        },
        {
          name: "Google BigQuery",
          description: "Serverless data warehouse",
          icon: "/images/data-tools/bigquery.svg",
        },
        {
          name: "Amazon Redshift",
          description: "Cloud data warehouse",
          icon: "/images/data-tools/redshift.svg",
        },
        {
          name: "Azure Synapse",
          description: "Analytics service",
          icon: "/public/images/data-tools/synapse.svg",
        },
      ],
    },
    {
      category: "Data Integration & ETL",
      technologies: [
        {
          name: "Fivetran",
          description: "Automated data integration",
          icon: "/images/data-tools/fivetran.svg",
        },
        {
          name: "dbt",
          description: "Data transformation tool",
          icon: "/images/data-tools/dbt.svg",
        },
        {
          name: "Airbyte",
          description: "Open-source ELT",
          icon: "/images/data-tools/airbyte.svg",
        },
        {
          name: "Talend",
          description: "Data integration platform",
          icon: "/images/data-tools/talend.svg",
        },
      ],
    },
    {
      category: "BI & Visualization",
      technologies: [
        {
          name: "Tableau",
          description: "Business intelligence",
          icon: "/images/data-tools/tableau.svg",
        },
        {
          name: "Power BI",
          description: "Microsoft analytics",
          icon: "/images/data-tools/powerbi.svg",
        },
        {
          name: "Looker",
          description: "Google BI platform",
          icon: "/images/data-tools/looker.svg",
        },
        {
          name: "Qlik Sense",
          description: "Associative analytics",
          icon: "/images/data-tools/qlik.svg",
        },
      ],
    },
    {
      category: "Data Science & ML",
      technologies: [
        {
          name: "Databricks",
          description: "Data analytics platform",
          icon: "/images/data-tools/databricks.svg",
        },
        {
          name: "DataRobot",
          description: "AI platform",
          icon: "/images/data-tools/datarobot.svg",
        },
        {
          name: "SageMaker",
          description: "AWS ML service",
          icon: "/images/data-tools/sagemaker.svg",
        },
        {
          name: "Azure ML",
          description: "Microsoft ML platform",
          icon: "/images/data-tools/azureml.svg",
        },
      ],
    },
  ];

  const benefits = [
    {
      title: "Drive Revenue Growth",
      description:
        "Identify upsell opportunities, optimize pricing, and personalize marketing",
      metric: "25%",
    },
    {
      title: "Reduce Operational Costs",
      description:
        "Improve efficiency, optimize supply chains, and predict maintenance",
      metric: "30%",
    },
    {
      title: "Risk Mitigation",
      description:
        "Detect fraud and proactively manage financial and compliance risks",
      metric: "40%",
    },
    {
      title: "Customer Experience",
      description:
        "Understand behavior and preferences to create superior products",
      metric: "50%",
    },
  ];

  const ctaLinks = [
    {
      text: "Start Data Project",
      href: "/contact",
      variant: "primary",
    },
    {
      text: "Explore Services",
      href: "/services/technology",
      variant: "secondary",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#f0f4ff] to-[#e8efff] py-20">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Data & Analytics
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Data solutions and analytics platforms to drive business insights,
              informed decisions, and strategic growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {ctaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${
                    link.variant === "primary"
                      ? "bg-[#20427f] text-white hover:bg-[#1a3568] shadow-lg hover:shadow-xl"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  } px-8 py-4 rounded-lg transition-all duration-200 font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Maturity Model Section */}
        <section className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Analytics Maturity Model
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From understanding what happened to prescribing what to do next
                - your journey to data-driven excellence
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {analyticsMaturity.map((analytics, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="text-4xl mb-4 text-center">
                    {analytics.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {analytics.type}
                  </h3>
                  <div className="bg-[#20427f] text-white rounded-lg p-3 mb-4 text-center">
                    <div className="font-semibold text-sm">
                      {analytics.question}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    {analytics.purpose}
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                      Examples:
                    </h4>
                    <ul className="space-y-2">
                      {analytics.examples.map((example, exampleIndex) => (
                        <li
                          key={exampleIndex}
                          className="flex items-start text-xs text-gray-600"
                        >
                          <svg
                            className="w-3 h-3 text-[#20427f] mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Data Analytics Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive data solutions covering the entire analytics
                lifecycle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.category}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {service.services.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border-l-4 border-[#20427f] bg-gray-50 rounded-r-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Analytics Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A structured methodology for delivering actionable insights and
                measurable results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#20427f] text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {step.description}
                  </p>
                  <ul className="space-y-1">
                    {step.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <svg
                          className="w-3 h-3 text-[#20427f] mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-20 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Modern Data Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-leading technologies powering our data and analytics
                solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-8 h-8"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">
                            {tech.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {tech.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Business Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your organization with data-driven decision making
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Faster Decisions",
                  description:
                    "Real-time dashboards and automated reporting enable quick, informed decisions that keep you ahead of the competition.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Actionable Insights",
                  description:
                    "Turn raw data into meaningful insights with advanced analytics, predictive modeling, and intuitive visualizations.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Unified Data",
                  description:
                    "Consolidate data from multiple sources into a single source of truth, eliminating silos and ensuring consistency.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Predictive Power",
                  description:
                    "Leverage machine learning and AI to forecast trends, identify opportunities, and mitigate risks before they impact your business.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#20427f] group-hover:scale-110 transition-all duration-300">
                    <div className="group-hover:[&_svg]:stroke-white transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-[#20427f] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="Data & Analytics"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#2c5aa0]">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Unlock Your Data's Potential?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's build data and analytics solutions that transform
              information into actionable business intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${
                    link.variant === "primary"
                      ? "bg-white text-[#20427f] hover:bg-gray-100 shadow-lg hover:shadow-xl"
                      : "border border-white text-white hover:bg-white hover:text-[#20427f]"
                  } px-8 py-4 rounded-lg transition-all duration-200 font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Data & Analytics - YourZerosAndOnes",
  description:
    "Comprehensive data and analytics services including data engineering, business intelligence, and predictive analytics",
};
