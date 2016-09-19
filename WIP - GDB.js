function ResolveEncounter() {
	var lTurnCount,  lTurnLimit, vActingCharDetails,  vActionDetails,  vTargetDetails, iTickMark, iLowestTicker, sOutput, sRow, vTempResult(), iCount, vResult(4), iTempChar, vTempResultArray(1), bPartyAlive,  bFoeAlive;
	setEncounter;
	lTurnLimit = 1000;
	while AliveOnBothSides = false{
		iTickMark = FindLowestTicker;
		ApplyTicker(iTickMark);
	}
	while CharsToAct = false{
		lTurnCount = lTurnCount + 1;
		vActingCharDetails = GetActingChar;
		vActionDetails = GetAction(CInt(vActingCharDetails(0)));
		vTargetDetails = GetTarget(CStr(vActionDetails(1)), CStr(vActingCharDetails(1)));
		ApplyAction(vActingCharDetails, vActionDetails, vTargetDetails);
	}
document.write("TURNS: " + lTurnCount);
}


function CharsToAct() {
return false;
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(IsAlive(CInt(vChars(i, 0))) == true ){
			if(vChars(i, 12) == 0 ){
				return true;
				break;
			}
		}
	}
}

function ApplyTicker(iTickAmount){
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(IsAlive(CInt(vChars(i, 0))) == true ){
			vChars(i, 12) = vChars(i, 12) - iTickAmount;
		}
	}
}

function FindLowestTicker(){
var iLowestTicker;
iLowestTicker = 10000;
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(IsAlive(CInt(vChars(i, 0))) == true ){
			if(vChars(i, 12) < iLowestTicker ){
				iLowestTicker = vChars(i, 12);
			}
		}
	}
return iLowestTicker;
}

function ApplyAction(vCharDetails, vActionDetails, vTargetDetails){
	//Execute Action;
	for(i=LBound(vTargetDetails); i<=UBound(vTargetDetails); i++){
		vChars(vTargetDetails(i), 3) = vChars(vTargetDetails(i), 3) + vActionDetails(2);
		if(vChars(vTargetDetails(i), 3) < 0 ){
			vChars(vTargetDetails(i), 3) = 0;
		}
		if(vChars(vTargetDetails(i), 3) > vChars(vTargetDetails(i), 4) ){
			vChars(vTargetDetails(i), 3) = vChars(vTargetDetails(i), 4);
		}
	}
	//Deduct Mana;
	vChars(vCharDetails(0), 5) = vChars(vCharDetails(0), 5) - vActionDetails(4);
	//Apply Cool Down Ticker;
	vChars(vCharDetails(0), 12) = vChars(vCharDetails(0), 13);
	//Reset Power CoolDowns;
		for(i=LBound(vPowers); i<=UBound(vPowers); i++){
			if(vPowers(i, 0) == vCharDetails(0) ){
				if(vPowers(i, 1) == vActionDetails(0) ){
					vPowers(i, 3) = vPowers(i, 4);
				}
			else{
				if(vPowers(i, 3) > 0 ){
					vPowers(i, 3) = vPowers(i, 3) - 1;
				}
			}
		}
	}
	//Output Result;
	switch(vActionDetails(1)){
		Case "Target Damage", "Auto Attack":
			sOutput = vChars(vCharDetails(0), 11) + " has attacked (" + vActionDetails(0) + ") " + vChars(vTargetDetails(0), 11) + " for " + (-1 * vActionDetails(2)) + " damage.";
		Case "Target Heal":
			sOutput = vChars(vCharDetails(0), 11) + " has healed " + vChars(vTargetDetails(0), 11) + " for " + vActionDetails(2) + " hit points.";
		Case "Mass Damage":
			switch( vCharDetails(1)){
				Case "P":
					sOutput = "All foes have received " + (-1 * vActionDetails(2)) + " damage from " + vChars(vCharDetails(0), 11) + "'s " + vActionDetails(0) + ".";
				Case "F":
					sOutput = "All party members have received " + (-1 * vActionDetails(2)) + " damage from " + vChars(vCharDetails(0), 11) + "'s " + vActionDetails(0) + ".";
			}
		Case "Mass Heal":
			switch( vCharDetails(1)){
				Case "P":
					sOutput = "All party members have been healed for " + vActionDetails(2) + " hit points by " + vChars(vCharDetails(0), 11) + "'s " + vActionDetails(0) + ".";
				Case "F":
					sOutput = "All party members have received " + (-1 * vActionDetails(2)) + " damage from " + vChars(vCharDetails(0), 11) + "'s " + vActionDetails(0) + ".";
			}

document.write(sOutput);
DebugArr(vChars);
	}
}
function DebugArr(vArr){
document.write("/////////////////////////////////////////////////");
	for(i=LBound(vArr); i<=UBound(vArr); i++){
		sRow = \";
		for(j=LBound(vArr; j<=2); j++){
			sRow = sRow + " / " + vArr(i, j);
		}
	document.write sRow;
	}
document.write("/////////////////////////////////////////////////")
}


function GetTarget(sActionType, sCharSide){
	switch( sActionType){
		var vTempResult(0);
			Case "Target Damage", "Auto Attack":
				for(i=LBound(vChars); i<=UBound(vChars); i++){
					if(vChars(i, 1) != sCharSide && IsAlive(CInt(i)) == true ){
						vTempResult(0) = i;
						break;
					}
				}
			Case "Target Heal":
				for(i=LBound(vChars); i<=UBound(vChars); i++){
					if(vChars(i, 1) == sCharSide && vChars(i, 3) > 0 && vChars(i, 3) < vChars(i, 4) ){
						vTempResult(0) = i;
						break;
					}
				}
			Case "Mass Damage":
				iCount = 0;
					for(i=LBound(vChars); i<=UBound(vChars); i++){
						if(vChars(i, 1) != sCharSide && vChars(i, 3) > 0 ){
							ReDim Preserve vTempResult(iCount);
							vTempResult(iCount) = i;
							iCount = iCount + 1;
						}
					}
			Case "Mass Heal":
				iCount = 0;
					for(i=LBound(vChars); i<=UBound(vChars); i++){
						if(vChars(i, 1) == sCharSide && vChars(i, 3) > 0 && vChars(i, 3) < vChars(i, 4) ){
							ReDim Preserve vTempResult(iCount);
							vTempResult(iCount) = i;
						}
					}
	}
GetTarget = vTempResult;
}

function CharCurrentMana(iCharIndex As Integer){
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(vChars(i, 0) == iCharIndex ){
			CharCurrentMana = vChars(i, 5);
			break;
		}
	}
}

function GetAction(iCharIndex As Integer){
	for(i=LBound(vPowers); i<=UBound(vPowers); i++){
		if(vPowers(i, 0) == iCharIndex ){
			if(vPowers(i, 3) == 0 ){
				if(CharCurrentMana(iCharIndex) >== vPowers(i, 6) ){
					vResult(0) = vPowers(i, 1)      //Action Name;
					vResult(1) = vPowers(i, 2)      //Action Type;
					vResult(2) = vPowers(i, 5)      //Mod;
					vResult(3) = vPowers(i, 4)      //Base Cooldown;
					vResult(4) = vPowers(i, 6)      //Mana Cost;
					break;
				}
			}
		}
	}
	return vResult;
}

function GetActingChar(){
var i,iTempMinimum;
iTempMinimum = 10000;
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(IsAlive(CInt(i)) == true ){
			if(vChars(i, 12) == 0 ){
				iTempChar = i;
				break;
			}
		}
	}
vTempResultArray(0) = iTempChar              //ActingCharID;
vTempResultArray(1) = vChars(iTempChar, 1)   //Char Side;
return vTempResultArray;
}

function AliveOnBothSides(){
	var i;
	return false;
	for(i=LBound(vChars); i<=UBound(vChars); i++){
		if(vChars(i, 3) > 0 ){
			if(vChars(i, 1) == "P" ){
				bPartyAlive = true;
			}
			if(vChars(i, 1) == "F" ){
				bFoeAlive = true;
			}
		}
	}
	if(bPartyAlive == true && bFoeAlive == true ){
		return true;
	}
}

function IsAlive(iCharIndex As Integer){
	return false;
		if(vChars(iCharIndex, 3) > 0 ){
			return true;
		}
	}
}