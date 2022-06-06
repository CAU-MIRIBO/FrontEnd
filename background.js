var lpEnablePreviewerBoxData = !0,
    lpBoxSizeData = "desktop",
    lpBlocklistData = [],
	IpKeywordData = !1,
	IpSummarizationData = !1,
	IpSentenceData = !1,
	IpShowAllData = !1,
	IpSWoption="";


chrome.runtime.onInstalled.addListener(function (t) {
	chrome.storage.sync.set({
					lpEnablePreviewerBoxData: lpEnablePreviewerBoxData,
					lpBoxSizeData: lpBoxSizeData,
					lpBlocklistData: lpBlocklistData,
					IpKeywordData: IpKeywordData,
					IpSummarizationData: IpSummarizationData,
					IpSentenceData: IpSentenceData,
					IpShowAllData: IpShowAllData,
					IpSWoption: IpSWoption
				});
});
