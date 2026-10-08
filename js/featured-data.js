/* ==========================================================================
   FEATURED MATTERS DATASET
   Public legal developments, reported judgments, and educational case notes.
   ========================================================================== */

const featuredMattersData = [
  // --- Category: reported-judgments (6 items) ---
  {
    id: "sonal-talpada",
    title: "Sonal Talpada v. Veerbhan Singh",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2024-03-15",
    formattedDate: "15 Mar 2024",
    url: "/featured/sonal-talpada-v-veerbhan-singh/",
    image: "/assets/images/courts/court_front.png",
    imageAlt: "Supreme Court of India judgment review",
    excerpt: "Comprehensive judicial analysis on mental cruelty, prolonged separation, and the breakdown of matrimonial relations in contemporary family jurisprudence."
  },
  {
    id: "ramneesh-pal-singh",
    title: "Col. Ramneesh Pal Singh v. Sugandhi Aggarwal",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2024-02-20",
    formattedDate: "20 Feb 2024",
    url: "/featured/ramneesh-pal-singh-v-sugandhi-aggarwal/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "High Court custody and guardianship proceedings",
    excerpt: "A landmark decision reiterating that the paramount welfare of the minor child governs custody determinations above statutory parental claims."
  },
  {
    id: "pradeep-bhardwaj",
    title: "Pradeep Bhardwaj v. Priya",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2024-01-18",
    formattedDate: "18 Jan 2024",
    url: "/featured/pradeep-bhardwaj-v-priya/",
    image: "/assets/images/featured/legal.png",
    imageAlt: "Matrimonial remedies and legal decree",
    excerpt: "Examination of evidentiary burdens regarding matrimonial disputes, assessment of interim maintenance, and principles governing dissolution."
  },
  {
    id: "shahjahan-up",
    title: "Shahjahan v. State of Uttar Pradesh",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2023-11-28",
    formattedDate: "28 Nov 2023",
    url: "/featured/shahjahan-v-state-of-uttar-pradesh/",
    image: "/assets/images/courts/court_front.png",
    imageAlt: "Constitutional liberties and criminal justice",
    excerpt: "A pivotal ruling concerning procedural delays, speedy trial guarantees, and liberty protections enshrined under Article 21 of the Constitution."
  },
  {
    id: "sugirtha-gowtham",
    title: "Sugirtha v. Gowtham",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2023-09-14",
    formattedDate: "14 Sep 2023",
    url: "/featured/sugirtha-v-gowtham/",
    image: "/assets/images/featured/legal.png",
    imageAlt: "Maintenance pendente lite jurisprudence",
    excerpt: "Precedent examining the computation of maintenance pendente lite, financial disclosures by spouses, and expeditious disposal of interim reliefs."
  },
  {
    id: "shivangi-bansal",
    title: "Shivangi Bansal v. Sahib Bansal",
    category: "reported-judgments",
    categoryLabel: "Reported Judgment",
    date: "2023-07-22",
    formattedDate: "22 Jul 2023",
    url: "/featured/shivangi-bansal-v-sahib-bansal/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "Visitation rights and child support",
    excerpt: "Supreme Court directives balancing structured visitation schedules with child emotional stability and equitable parental responsibilities."
  },

  // --- Category: significant-matters (6 items) ---
  {
    id: "sarfaesi-enforcement",
    title: "Banking Recovery & SARFAESI Enforcement Framework",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2024-04-10",
    formattedDate: "10 Apr 2024",
    url: "/featured/banking-recovery-proceedings/",
    image: "/assets/images/banking.png",
    imageAlt: "Banking recovery documents and ledger",
    excerpt: "Procedural analysis of security interest enforcement under Sections 13(2), 13(4), and borrower appellate remedies before the Debts Recovery Tribunal."
  },
  {
    id: "commercial-mediation",
    title: "Mandatory Pre-Institution Mediation in Commercial Disputes",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2024-03-05",
    formattedDate: "05 Mar 2024",
    url: "/practice-areas/civil-commercial/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "Commercial dispute negotiation and mediation",
    excerpt: "Review of Section 12A of the Commercial Courts Act 2015, exceptions for urgent interim relief, and strict compliance mandates established by the Supreme Court."
  },
  {
    id: "directors-ni-act",
    title: "Vicarious Liability of Directors under Section 141 NI Act",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2024-01-29",
    formattedDate: "29 Jan 2024",
    url: "/featured/understanding-ni-act-prosecutions/",
    image: "/assets/images/featured/legal.png",
    imageAlt: "Negotiable instruments and corporate governance",
    excerpt: "Examining statutory requirements for specific averments establishing day-to-day managerial responsibility to sustain cheque bounce prosecutions against directors."
  },
  {
    id: "specific-relief-injunctions",
    title: "Specific Performance and Injunction Jurisprudence",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2023-12-12",
    formattedDate: "12 Dec 2023",
    url: "/practice-areas/property/",
    image: "/assets/images/property.png",
    imageAlt: "Property agreements and judicial decree",
    excerpt: "Analysis of post-2018 Specific Relief Act amendments making specific performance a mandatory statutory remedy rather than a discretionary equitable relief."
  },
  {
    id: "drt-timelines",
    title: "Statutory Limitation and Procedural Appeals in DRT",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2023-10-30",
    formattedDate: "30 Oct 2023",
    url: "/practice-areas/banking-recovery/",
    image: "/assets/images/banking.png",
    imageAlt: "Debt recovery appellate procedures",
    excerpt: "Navigating the strict 45-day limitation period under Section 17 of SARFAESI and pre-deposit mandates under Section 18 for Debts Recovery Appellate Tribunal appeals."
  },
  {
    id: "arbitral-article-227",
    title: "Article 227 Supervisory Jurisdiction over Arbitral Orders",
    category: "significant-matters",
    categoryLabel: "Significant Matter",
    date: "2023-08-16",
    formattedDate: "16 Aug 2023",
    url: "/practice-areas/high-court-writ/",
    image: "/assets/images/delhi-high-court.png",
    imageAlt: "Delhi High Court writ supervisory jurisdiction",
    excerpt: "High Court thresholds limiting writ intervention under Article 227 against procedural orders of arbitral tribunals to exceptional instances of patent lack of jurisdiction."
  },

  // --- Category: publications (6 items) ---
  {
    id: "ni-act-prosecutions",
    title: "Understanding Section 138 NI Act Cheque Dishonour",
    category: "publications",
    categoryLabel: "Publication",
    date: "2024-02-14",
    formattedDate: "14 Feb 2024",
    url: "/featured/understanding-ni-act-prosecutions/",
    image: "/assets/images/featured/legal.png",
    imageAlt: "Legal publication on negotiable instruments",
    excerpt: "A practical step-by-step guide on statutory demand notice timelines, limitation computation, and evidentiary presumptions under Sections 118 and 139."
  },
  {
    id: "commercial-dispute-trends",
    title: "Contemporary Strategies in Commercial Dispute Resolution",
    category: "publications",
    categoryLabel: "Publication",
    date: "2024-01-10",
    formattedDate: "10 Jan 2024",
    url: "/practice-areas/civil-commercial/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "Commercial contracts and dispute management",
    excerpt: "An overview of evolving dispute management strategies combining early case evaluation, structured mediation, and expedited commercial court litigation."
  },
  {
    id: "delhi-property-due-diligence",
    title: "Title Verification and Due Diligence in Delhi Real Estate",
    category: "publications",
    categoryLabel: "Publication",
    date: "2023-11-05",
    formattedDate: "05 Nov 2023",
    url: "/practice-areas/property/",
    image: "/assets/images/property.png",
    imageAlt: "Real estate title search and land records",
    excerpt: "Essential legal checks covering 30-year encumbrance certificates, sub-registrar record searches, mutation verification, and local zonal master plan clearances."
  },
  {
    id: "interim-relief-arbitration",
    title: "Pre-Arbitral Relief under Section 9: Principles and Practice",
    category: "publications",
    categoryLabel: "Publication",
    date: "2023-09-25",
    formattedDate: "25 Sep 2023",
    url: "/practice-areas/arbitration/",
    image: "/assets/images/justice-law-rights-remedy-trust.png",
    imageAlt: "Arbitration statute and legal text",
    excerpt: "Examining judicial standards for prima facie merit, balance of convenience, and imminent threat required to obtain asset-freezing orders before arbitration starts."
  },
  {
    id: "bnss-maintenance-framework",
    title: "Maintenance Framework under Bharatiya Nagarik Suraksha Sanhita",
    category: "publications",
    categoryLabel: "Publication",
    date: "2023-08-08",
    formattedDate: "08 Aug 2023",
    url: "/insights/maintenance-under-bnss/",
    image: "/assets/images/courts/court_front.png",
    imageAlt: "Statutory maintenance under new criminal procedure",
    excerpt: "Comparative analysis of maintenance provisions under Section 144 BNSS (former Section 125 CrPC) and mandatory disclosure of assets and liabilities affidavits."
  },
  {
    id: "arbitration-agreement-drafting",
    title: "Drafting Effective Commercial Arbitration Clauses",
    category: "publications",
    categoryLabel: "Publication",
    date: "2023-06-18",
    formattedDate: "18 Jun 2023",
    url: "/practice-areas/legal-drafting-advisory/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "Legal drafting and contract clauses",
    excerpt: "Best practices in defining seat versus venue, governing substantive law, institutional rules, multi-tiered escalation mechanisms, and arbitrator qualifications."
  },

  // --- Category: speaking-recognition (6 items) ---
  {
    id: "procedural-criminal-defence",
    title: "Procedural Safeguards in Criminal Defence and Bail Practice",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2024-03-22",
    formattedDate: "22 Mar 2024",
    url: "/practice-areas/criminal-ni-act/",
    image: "/assets/images/courts/court_front.png",
    imageAlt: "Criminal trial procedure and fundamental rights",
    excerpt: "Insights on arrest compliance under Arnesh Kumar guidelines, statutory remand procedures, and anticipatory bail jurisprudence across Delhi trial courts."
  },
  {
    id: "consumer-protection-framework",
    title: "Practical Approaches to Consumer Protection Act 2019",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2024-02-02",
    formattedDate: "02 Feb 2024",
    url: "/practice-areas/civil-commercial/",
    image: "/assets/images/featured/contract.png",
    imageAlt: "Consumer rights and tribunal advocacy",
    excerpt: "Discussion of pecuniary thresholds, e-filing provisions, mediation cells at District Commissions, and liability for unfair contracts and defective services."
  },
  {
    id: "witness-examination-civil",
    title: "Techniques in Witness Examination in Commercial Trials",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2023-11-19",
    formattedDate: "19 Nov 2023",
    url: "/practice-areas/civil-commercial/",
    image: "/assets/images/featured/legal.png",
    imageAlt: "Evidence law and trial examination",
    excerpt: "Practical perspective on drafting examination-in-chief affidavits, cross-examination on electronic records under Section 65B, and document admission procedures."
  },
  {
    id: "delhi-rent-control",
    title: "Tenancy Disputes & Eviction Grounds under Delhi Rent Control",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2023-10-15",
    formattedDate: "15 Oct 2023",
    url: "/practice-areas/property/",
    image: "/assets/images/property.png",
    imageAlt: "Property rent control and commercial tenancy",
    excerpt: "Key legal considerations in bonafide commercial requirement petitions under Section 14(1)(e) and leave-to-defend standards before Additional Rent Controllers."
  },
  {
    id: "administrative-natural-justice",
    title: "Natural Justice Principles Before Administrative Tribunals",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2023-07-09",
    formattedDate: "09 Jul 2023",
    url: "/practice-areas/high-court-writ/",
    image: "/assets/images/delhi-high-court.png",
    imageAlt: "Administrative law and tribunal justice",
    excerpt: "Analysis of reasoned speaking orders, procedural fairness, and statutory remedies when administrative authorities pass orders without granting personal hearings."
  },
  {
    id: "arbitral-award-enforcement",
    title: "Enforcement of Domestic Arbitral Awards in Delhi High Court",
    category: "speaking-recognition",
    categoryLabel: "Speaking & Recognition",
    date: "2023-05-12",
    formattedDate: "12 May 2023",
    url: "/practice-areas/arbitration/",
    image: "/assets/images/justice-law-rights-remedy-trust.png",
    imageAlt: "Arbitral decree execution and attachment",
    excerpt: "Procedural framework for executing arbitral awards as civil court decrees under Section 36 and navigating post-amendment unconditional stay rules."
  }
];

if (typeof window !== "undefined") {
  window.featuredMattersData = featuredMattersData;
}
