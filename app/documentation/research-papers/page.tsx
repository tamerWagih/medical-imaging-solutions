"use client";

import Link from "next/link";
import { FileText, BookOpen, BarChart3, Activity, Brain } from "lucide-react";
import "./research-papers.css";
import { useSearchParams } from "next/navigation";

type PaperItem = {
  id: string;
  title: string;
  summary: string;
  year: number;
  href?: string;
};

const papers: PaperItem[] = [
  {
    id: "paper-1",
    title:
      "Radiomic features for prostate cancer detection on MRI differ between the transition and peripheral zones: preliminary findings from a multi‑institutional study",
    summary:
      "Zone‑specific radiomics on 3T mpMRI reveals differences in PCa detection between TZ and PZ.",
    year: 2017,
    href: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jmri.25562",
  },
  {
    id: "paper-2",
    title:
      "Radiomic features on MRI enable risk categorization of prostate cancer patients on active surveillance: Preliminary findings",
    summary:
      "Radiomic signatures on MRI stratify risk for patients under active surveillance.",
    year: 2018,
    href: "https://onlinelibrary.wiley.com/doi/abs/10.1002/jmri.25983",
  },
  {
    id: "paper-3",
    title:
      "Radiomics based targeted radiotherapy planning (Rad‑TRaP): a computational framework for prostate cancer treatment planning with MRI",
    summary:
      "Framework integrates MRI radiomics into targeted radiotherapy planning.",
    year: 2016,
    href: "https://link.springer.com/article/10.1186/s13014-016-0718-3",
  },
  {
    id: "paper-4",
    title:
      "Combination of peri‑tumoral and intra‑tumoral radiomic features on bi‑parametric MRI accurately stratifies prostate cancer risk: a multi‑site study",
    summary:
      "Combining peri‑ and intra‑tumoral features improves risk stratification across sites.",
    year: 2020,
    href: "https://www.mdpi.com/2072-6694/12/8/2200",
  },
  {
    id: "paper-5",
    title:
      "A novel imaging based Nomogram for predicting post‑surgical biochemical recurrence and adverse pathology of prostate cancer from pre‑operative bi‑parametric MRI",
    summary:
      "Pre‑operative bi‑parametric MRI nomogram predicts recurrence and adverse pathology.",
    year: 2021,
    href: "https://www.thelancet.com/journals/ebiom/article/PIIS2352-3964(20)30539-9/fulltext",
  },
  {
    id: "paper-6",
    title:
      "Generative adversarial networks can create high quality artificial prostate cancer magnetic resonance images",
    summary:
      "GANs synthesize realistic prostate MRI to augment datasets and workflows.",
    year: 2023,
    href: "https://www.mdpi.com/2075-4426/13/3/547",
  },
  {
    id: "paper-7",
    title:
      "Clinical‑Genomic Risk Group Classification of Suspicious Lesions on Prostate Multiparametric‑MRI",
    summary:
      "Integrates imaging and genomics to classify lesion risk groups on mpMRI.",
    year: 2023,
    href: "https://www.mdpi.com/2072-6694/15/21/5240",
  },
  {
    id: "paper-8",
    title:
      "Uncovering prostate cancer aggressiveness signal in T2‑weighted MRI through a three‑reference tissues normalization technique",
    summary:
      "Three‑reference tissues normalization enhances aggressiveness signal on T2‑MRI.",
    year: 2024,
    href: "https://analyticalsciencejournals.onlinelibrary.wiley.com/doi/full/10.1002/nbm.5069",
  },
  {
    id: "paper-9",
    title:
      "Radiomic features derived from pre‑operative multi‑parametric MRI of prostate cancer are associated with decipher risk score",
    summary:
      "MRI radiomics associates with Decipher genomic risk categorization pre‑operatively.",
    year: 2019,
    href: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/10950/109503Y/Radiomic-features-derived-from-pre-operative-multi-parametric-MRI-of/10.1117/12.2512606.short",
  },
  {
    id: "paper-10",
    title:
      "HRS Improves Active Surveillance for Prostate Cancer by Timely Identification of Progression",
    summary:
      "Habitat Risk Score enhances detection of progression during active surveillance.",
    year: 2025,
    href: "https://www.sciencedirect.com/science/article/pii/S1076633224008535",
  },
  {
    id: "paper-11",
    title:
      "Integration of Habitat Risk Score (HRS) in Radiotherapy for Prostate Cancer",
    summary:
      "Integrating HRS into radiotherapy planning for improved treatment strategies.",
    year: 2025,
    href: "https://www.redjournal.org/article/S0360-3016(25)06347-3/abstract",
  },
  {
    id: "paper-12",
    title:
      "Integrated framework for quantitative T2‑weighted MRI analysis following prostate cancer radiotherapy",
    summary:
      "Quantitative T2‑MRI framework to assess outcomes post‑radiotherapy.",
    year: 2024,
    href: "https://www.sciencedirect.com/science/article/pii/S2405631624001301",
  },
  {
    id: "paper-13",
    title:
      "Longitudinal changes and predictive value of multiparametric MRI features for prostate cancer patients treated with MRI‑guided lattice extreme ablative dose (LEAD) boost",
    summary:
      "Longitudinal mpMRI feature changes predict outcomes after LEAD boost.",
    year: 2022,
    href: "https://www.mdpi.com/2072-6694/14/18/4475",
  },
  {
    id: "paper-14",
    title:
      "Association of radiomic features from prostate bi‑parametric MRI with Decipher risk categories to predict risk for biochemical recurrence post‑prostatectomy",
    summary:
      "bpMRI radiomics associated with Decipher categories predict biochemical recurrence.",
    year: 2019,
    href: "https://ascopubs.org/doi/abs/10.1200/JCO.2019.37.15_suppl.e16561",
  },
  {
    id: "paper-15",
    title:
      "Predicting prostate cancer risk of progression with multiparametric MRI using machine learning and peritumoral radiomics",
    summary:
      "Machine learning and peritumoral radiomics predict PCa progression risk.",
    year: 2021,
    href: "https://patents.google.com/patent/US11011265B2/en",
  },
  {
    id: "paper-16",
    title:
      "MP60‑04 Quantitative assessment of T2‑weighted MRI to better identify patients with prostate cancer in a screening population",
    summary:
      "Quantitative T2‑MRI aids identification of PCa in screening populations.",
    year: 2015,
    href: "https://www.auajournals.org/doi/full/10.1016/j.juro.2015.02.2206",
  },
  {
    id: "paper-17",
    title:
      "Prostate Cancer Risk Stratification Using Radiomics for Patients on Active Surveillance: Multi-Institutional Use Cases",
    summary:
      "About 34% of prostate cancer patients have low-risk disease suited for active surveillance. Multiparametric MRI (mpMRI) offers structural and functional insights and is standardized through PI-RADS, but its limited ability to distinguish tumor confounders and high inter-observer variability hinder its full adoption for non-invasive monitoring of disease progression.",
    year: 2020,
    href: "https://www.proquest.com/openview/d2a40f76835f7f8625c978a72a233563/1?pq-origsite=gscholar&cbl=18750&diss=y",
  },
  {
    id: "paper-18",
    title:
      "MP35-01 PROSTATE TUMOR TEXTURAL HETEROGENEITY OF 11C-ACETATE POSITRON EMISSION TOMOGRAPHY AND T2-WEIGHTED MAGNETIC RESONANCE IMAGING CORRELATE WITH BIOCHEMICAL RECURRENCE: PRELIMINARY FINDINGS",
    summary:
      "Multiparametric prostate MRI aids in cancer localization and Gleason prediction, while 11C-acetate PET detects metastases. CT complements PET but offers limited anatomy. Radiomics, extracting image-based features, may capture tumor heterogeneity. This study evaluates radiomics from MRI, PET, and CT to differentiate patients with and without biochemical recurrence after surgery.",
    year: 2018,
    href: "https://www.auajournals.org/doi/full/10.1016/j.juro.2018.02.1114",
  },
  {
    id: "paper-19",
    title:
      "A novel segmentation method to identify left ventricular infarction in short-axis composite strain-encoded magnetic resonance images",
    summary:
      "Composite Strain Encoding (CSENC) MRI simultaneously captures cardiac function and viability. This study introduces an unsupervised segmentation method using Bayesian classification, Otsu thresholding, morphology, boundary tracing, and fuzzy C-means clustering to identify infarcted tissue. Tested on patient and simulated data, it accurately detects myocardial infarction with high precision and reliability.",
    year: 2011,
    href: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/7962/79622E/A-novel-segmentation-method-to-identify-left-ventricular-infarction-in/10.1117/12.877098.short",
  },
  {
    id: "paper-20",
    title:
      "Patient Selection for Active Surveillance for Prostate Cancer based on Deep Features from U-Found: An MRI-based Foundation Model of the Prostate",
    summary:
      "We present an application of novel MRI-based foundation model of the prostate to assess prostate cancer progression risk for AS patients, thereby providing essential data for clinicians that can prospectively improve AS patient selection.",
    year: 2025,
    href: "https://archive.ismrm.org/2025/4004_QQX8CiSHQ.html",
  },
  {
    id: "paper-21",
    title:
      "Self-supervised Learning Network on Large Prostate Cancer mpMRI Dataset: Towards A Foundational Model of the Prostate",
    summary:
      "U-Found is the first foundation-like model developed for prostate mpMRI. The embeddings, combining cancer and overall prostate characteristics features can be used in comprehensive modeling of cancer progression or response to therapy.",
    year: 2025,
    href: "https://archive.ismrm.org/2025/4006.html",
  },
  {
    id: "paper-22",
    title:
      "The Role of Quantitative Imaging for Early Detection of Prostate Cancer Progression in Patients on Active Surveillance",
    summary:
      "Integrating Habitat Risk Score (HRS) in Active Surveillance for prostate cancer has the potential to significantly reduce the number of surveillance biopsies. HRS facilitates the detection of progression through assignment of robust biopsy targets and quantification of tumor habitat changes.",
    year: 2024,
    href: "https://archive.ismrm.org/2024/0551.html",
  },
  {
    id: "paper-23",
    title:
      "Integrated Registration and Harmonization Framework for Quantitative T2-weighted MRI Analysis following Prostate Cancer Radiotherapy",
    summary:
      "The developed methodology allows to automatically detect ROIs in post-RT MRI exams, reduces data acquisition-related variation and improves imaging features’ repeatability, thereby enables the quantitative characterization of RT-induced changes in T2w.",
    year: 2024,
    href: "https://archive.ismrm.org/2024/0543.html",
  },
  {
    id: "paper-24",
    title:
      "Quantitative Imaging Habitat Risk Score (HRS) Combined with PI-RADSv2 Improves Predictive Value of Prostate Lesion Identification on mpMRI",
    summary:
      "To investigate how quantitative analysis of prostate mpMRI through Habitat Risk Scoring (HRS) combined with PI-RADS can improve prostate lesion identification compared to using PI-RADS alone.",
    year: 2024,
    href: "https://archive.ismrm.org/2024/4822.html",
  },
  {
    id: "paper-25",
    title:
      "Multiparametric MRI Radiomic Features Improve Patient Selection for Active Surveillance in Prostate Cancer",
    summary:
      "We developed a progression risk stratification model using mpMRI data from an AS trial, and incorporating clinical biomarkers and radiomic features from lesions identified by a deep neural network.",
    year: 2024,
    href: "https://archive.ismrm.org/2024/0859.html",
  },
  {
    id: "paper-26",
    title:
      "A Novel Deep Learning Tissue Normalization Method for Longitudinal Analysis of T2-Weighted MRI following Prostate Cancer Radiation Treatment",
    summary:
      "In this work, we introduce a novel automated triple-reference intensity normalization method for T2W images with the aim of obtaining consistent longitudinal measurements leading to improved quantitative assessment of radiation treatment outcome for prostate cancer patients.",
    year: 2023,
    href: "https://archive.ismrm.org/2023/3237.html",
  },
  {
    id: "paper-27",
    title:
      "mpMRI Radiomic Features Predict the Likelihood for Progression to Treatment of Prostate Cancer Patients on Active Surveillance",
    summary:
      "Active surveillance (AS) for prostate cancer has emerged as a safe and attractive alternative to immediate treatment. Here we present an integrated method for baseline mpMRI analysis enabling early detection of patients harboring lesions with a high potential for progression.",
    year: 2023,
    href: "https://archive.ismrm.org/2023/2068.html",
  },
  {
    id: "paper-28",
    title:
      "Prediction of Genomic Signature of Prostate Lesion Radiosensitivity by mpMRI Radiomics and Machine Learning",
    summary:
      "We aimed to develop a model predictive of PORTOS genomic signature using multiparametric MRI (mpMRI) radiomics features and machine learning. Lesions were localized based on Habitat Risk Score maps.",
    year: 2024,
    href: "https://archive.ismrm.org/2023/2898.html",
  },
  {
    id: "paper-29",
    title:
      "Characterization of Longitudinal Anatomic and Functional Changes following HIFU Therapy and Implications for Prostate Cancer Surveillance",
    summary:
      "Detecting prostate cancer recurrence after high intensity focused ultrasound (HIFU) therapy is a challenge for clinicians. We characterize longitudinal anatomical/functional changes of prostate in men undergoing HIFU therapy for prostate cancer.",
    year: 2023,
    href: "https://archive.ismrm.org/2023/1782.html",
  },
  {
    id: "paper-30",
    title:
      "Peri-tumoral radiomics on 3T MRI discriminative of D’Amico prostate cancer risk categories show association with epithelium, lumen and stromal densities on whole mount pathology",
    summary:
      "In this work, we explore association of peri-tumoral radiomic features of prostate extracted from mpMRI with D’Amico risk. Additionally, we explore morphologic basis of these peri-tumoral features by analyzing the region on whole mount pathology.",
    year: 2019,
    href: "https://archive.ismrm.org/2019/0376.html",
  },
  {
    id: "paper-31",
    title: "Detection of cardiac infarction in MRI C-SENC images",
    summary:
      "In this work, a novel multi-stage method is proposed to identify ventricular infarction in the functional and viability images provided by C-SENC MRI.",
    year: 2010,
    href: "https://www.academia.edu/download/83576171/Detection_of_cardiac_infarction_in_MRI_C20220409-5507-zqf4oj.pdf",
  },
  {
    id: "paper-32",
    title:
      "Improved segmentation technique to detect cardiac infarction in MRI C-SENC images",
    summary:
      "In this work, a new multi-stage technique is proposed to objectively identify infarcted heart tissues in the functional and viability images provided by C-SENC MRI.",
    year: 2010,
    href: "https://ieeexplore.ieee.org/abstract/document/5716044/",
  },
  {
    id: "paper-33",
    title:
      "Predicting prostate cancer risk of progression with multiparametric magnetic resonance imaging using machine learning and peritumoral radiomics",
    summary:
      "A first set of embodiments relates to training of a machine learning classifier to compute a probability that a patient has a low-risk of PCa progression based on intratumoral radiomic features and peritumoral radiomic features extracted from multi-parametric magnetic resonance imaging images.",
    year: 2021,
    href: "https://patents.google.com/patent/US11011265B2/en",
  },
];

export default function ResearchPapersPage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const parsed = pageParam ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = 9;
  const totalItems = papers.length;
  const maxPage = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentPage = Math.min(Math.max(parsed || 1, 1), maxPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const sortedPapers = [...papers].sort((a, b) => b.year - a.year);
  const currentPapers = sortedPapers.slice(startIndex, startIndex + itemsPerPage);
  const prevHref =
    currentPage > 1
      ? `/documentation/research-papers?page=${currentPage - 1}`
      : null;
  const nextHref =
    currentPage < maxPage
      ? `/documentation/research-papers?page=${currentPage + 1}`
      : null;
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  return (
    <div>
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h2 className="products-title">
              Research <span className="products-title-gradient">Papers</span>
            </h2>
            <p className="products-subtitle">
              Peer-reviewed publications and scientific documentation related to
              RadView and HRS
            </p>
          </div>

          <div
            className="research-grid"
            role="grid"
            aria-label="Research papers grid"
          >
            {currentPapers.map((paper, index) => {
              return (
                <div
                  key={paper.id}
                  className="product-card radview-module-card"
                  role="gridcell"
                  aria-label={`Paper ${startIndex + index + 1}: ${paper.title}`}
                >
                  <div className="product-card-header">
                    <div className="product-card-icon-wrapper"></div>
                    <span className="product-card-badge">
                      Paper {startIndex + index + 1}
                    </span>
                  </div>
                  <h3 className="product-card-title" style={{ fontSize: "1.3rem", lineHeight: "2rem" }}>{paper.title}</h3>
                  <p className="product-card-tagline"> {paper.year}</p>
                  <p className="product-card-description"style={{ fontSize: "0.8rem", lineHeight: "1.5rem" }}>{paper.summary}</p>

                  <Link
                    href={paper.href ?? "/documentation"}
                    className="product-card-button"
                    aria-label={`Open publication: ${paper.title}`}
                    target={paper.href ? "_blank" : undefined}
                    rel={paper.href ? "noopener noreferrer" : undefined}
                  >
                    <FileText size={16} />
                    Read More
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div
            className="research-pagination"
            role="navigation"
            aria-label="Research papers pagination"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <span className="pagination-info" aria-live="polite">
              Page {currentPage} of {maxPage} · Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
            </span>
            <div
              className="pagination-actions"
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              {prevHref ? (
                <Link
                  href={prevHref}
                  className="product-card-button"
                  aria-label="Previous page"
                >
                  Previous
                </Link>
              ) : (
                <span
                  className="product-card-button"
                  aria-disabled="true"
                  style={{ opacity: 0.5, pointerEvents: "none" }}
                >
                  Previous
                </span>
              )}
              {pages.map((p) =>
                p === currentPage ? (
                  <span
                    key={`page-${p}`}
                    className="product-card-button"
                    aria-current="page"
                    style={{ pointerEvents: "none", opacity: 0.85, fontWeight: 600 }}
                  >
                    {p}
                  </span>
                ) : (
                  <Link
                    key={`page-${p}`}
                    href={`/documentation/research-papers?page=${p}`}
                    className="product-card-button"
                    aria-label={`Go to page ${p}`}
                  >
                    {p}
                  </Link>
                )
              )}
              {nextHref ? (
                <Link
                  href={nextHref}
                  className="product-card-button"
                  aria-label="Next page"
                >
                  Next
                </Link>
              ) : (
                <span
                  className="product-card-button"
                  aria-disabled="true"
                  style={{ opacity: 0.5, pointerEvents: "none" }}
                >
                  Next
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
